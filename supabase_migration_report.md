# Supabase Database Migration & Architecture Report

> **Target Supabase Project:** `pbgiuuacirzzvgxumutl`  
> **Application:** Q-Bank — CUSAT EEE Question Papers Archive  
> **Prepared For:** Claude / Supabase SQL Editor Execution

---

## 1. Executive Summary of Required Changes

To support the updated multi-level folder drilldown architecture (Academic Year &rarr; Scheme [2019, 2023, 2025] &rarr; Semester [1&ndash;8] &rarr; Alphabetical Subject Folders), the following changes are required in your Supabase backend:

1. **Scheme Constraint Update:** Ensure the `scheme` column in both `papers` and `paper_requests` tables permits `2019`, `2023`, and `2025`.
2. **Semester Constraint Validation:** Ensure `semester` allows values between `1` and `8`.
3. **Academic Year Mapping (Generated Column):** Add a generated column `academic_year` (`1`, `2`, `3`, `4`) computed from `semester` to accelerate queries and analytics.
4. **Performance Indexes for Fast Browsing:** Composite indexes on `(scheme, semester, is_published)` and alphabetical indexing on `(subject_name, subject_code)` to enable instant folder loading and alphabetical grouping.
5. **Atomic Download Counter RPC:** Secure stored procedure to atomically increment paper download counts without race conditions.
6. **Row Level Security (RLS) Policies:** Ensure read access for public students and full CRUD access for authenticated administrators.

---

## 2. Complete SQL Migration Script

You can copy and execute this entire script directly in the **Supabase SQL Editor** (or paste it into Claude):

```sql
-- =====================================================================
-- Q-BANK SUPABASE MIGRATION SCRIPT
-- =====================================================================

-- 1. SCHEME CONSTRAINTS UPDATE (Support 2015, 2019, 2023, 2025)
ALTER TABLE IF EXISTS public.papers 
  DROP CONSTRAINT IF EXISTS papers_scheme_check;

ALTER TABLE public.papers 
  ADD CONSTRAINT papers_scheme_check 
  CHECK (scheme IN (2015, 2019, 2023, 2025));

ALTER TABLE IF EXISTS public.paper_requests 
  DROP CONSTRAINT IF EXISTS paper_requests_scheme_check;

ALTER TABLE public.paper_requests 
  ADD CONSTRAINT paper_requests_scheme_check 
  CHECK (scheme IN (2015, 2019, 2023, 2025));

-- 2. SEMESTER CONSTRAINTS (Semesters 1 through 8)
ALTER TABLE IF EXISTS public.papers 
  DROP CONSTRAINT IF EXISTS papers_semester_check;

ALTER TABLE public.papers 
  ADD CONSTRAINT papers_semester_check 
  CHECK (semester BETWEEN 1 AND 8);

ALTER TABLE IF EXISTS public.paper_requests 
  DROP CONSTRAINT IF EXISTS paper_requests_semester_check;

ALTER TABLE public.paper_requests 
  ADD CONSTRAINT paper_requests_semester_check 
  CHECK (semester BETWEEN 1 AND 8);

-- 3. EXAM TYPE CONSTRAINTS
ALTER TABLE IF EXISTS public.papers 
  DROP CONSTRAINT IF EXISTS papers_exam_type_check;

ALTER TABLE public.papers 
  ADD CONSTRAINT papers_exam_type_check 
  CHECK (exam_type IN ('series1', 'series2', 'endsem', 'supplementary'));

-- 4. ACADEMIC YEAR GENERATED COLUMN
-- Maps Semester 1-2 -> Year 1, 3-4 -> Year 2, 5-6 -> Year 3, 7-8 -> Year 4
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
      AND table_name = 'papers' 
      AND column_name = 'academic_year'
  ) THEN
    ALTER TABLE public.papers 
    ADD COLUMN academic_year INT 
    GENERATED ALWAYS AS (
      CASE 
        WHEN semester IN (1, 2) THEN 1
        WHEN semester IN (3, 4) THEN 2
        WHEN semester IN (5, 6) THEN 3
        ELSE 4
      END
    ) STORED;
  END IF;
END $$;

-- 5. VERIFIED STATUS COLUMN
ALTER TABLE IF EXISTS public.papers 
  ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT FALSE;

-- 6. PERFORMANCE INDEXES
-- Index for instant drilldown filtering by scheme and semester
CREATE INDEX IF NOT EXISTS idx_papers_drilldown 
ON public.papers(scheme, semester, is_published);

-- Index for alphabetical subject listing and searching
CREATE INDEX IF NOT EXISTS idx_papers_alphabetical 
ON public.papers(subject_name, subject_code);

-- Index for exam type filters
CREATE INDEX IF NOT EXISTS idx_papers_exam_type 
ON public.papers(exam_type);

-- Index for popular papers ranking
CREATE INDEX IF NOT EXISTS idx_papers_downloads 
ON public.papers(download_count DESC);

-- Index for requests tab
CREATE INDEX IF NOT EXISTS idx_requests_status 
ON public.paper_requests(status, created_at DESC);

-- 6. ATOMIC DOWNLOAD COUNTER RPC
CREATE OR REPLACE FUNCTION public.increment_download(p_paper_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.papers
  SET download_count = COALESCE(download_count, 0) + 1
  WHERE id = p_paper_id;
END;
$$;

-- Grant execution to anonymous and authenticated users
GRANT EXECUTE ON FUNCTION public.increment_download(UUID) TO anon, authenticated;

-- 7. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.papers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.paper_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Papers: Public can view published papers
DROP POLICY IF EXISTS "Public can view published papers" ON public.papers;
CREATE POLICY "Public can view published papers" 
ON public.papers FOR SELECT 
USING (is_published = true);

-- Papers: Admins can do everything
DROP POLICY IF EXISTS "Admins have full access to papers" ON public.papers;
CREATE POLICY "Admins have full access to papers" 
ON public.papers FOR ALL 
USING (EXISTS (SELECT 1 FROM public.admins WHERE user_id = auth.uid()));

-- Requests: Anyone can submit a request
DROP POLICY IF EXISTS "Anyone can submit paper request" ON public.paper_requests;
CREATE POLICY "Anyone can submit paper request" 
ON public.paper_requests FOR INSERT 
WITH CHECK (true);

-- Requests: Admins can view and update requests
DROP POLICY IF EXISTS "Admins can view and manage requests" ON public.paper_requests;
CREATE POLICY "Admins can view and manage requests" 
ON public.paper_requests FOR ALL 
USING (EXISTS (SELECT 1 FROM public.admins WHERE user_id = auth.uid()));

-- Admins table: Authenticated users can check if they are an admin
DROP POLICY IF EXISTS "Users can check their admin status" ON public.admins;
CREATE POLICY "Users can check their admin status" 
ON public.admins FOR SELECT 
USING (auth.uid() = user_id);

-- 8. STORAGE BUCKET CONFIGURATION
INSERT INTO storage.buckets (id, name, public) 
VALUES ('papers', 'papers', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage Policies
DROP POLICY IF EXISTS "Public can view papers storage" ON storage.objects;
CREATE POLICY "Public can view papers storage"
ON storage.objects FOR SELECT
USING (bucket_id = 'papers');

DROP POLICY IF EXISTS "Admins can upload to papers storage" ON storage.objects;
CREATE POLICY "Admins can upload to papers storage"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'papers' AND EXISTS (SELECT 1 FROM public.admins WHERE user_id = auth.uid()));

DROP POLICY IF EXISTS "Admins can delete from papers storage" ON storage.objects;
CREATE POLICY "Admins can delete from papers storage"
ON storage.objects FOR DELETE
USING (bucket_id = 'papers' AND EXISTS (SELECT 1 FROM public.admins WHERE user_id = auth.uid()));
```

---

## 3. Recommended Prompt for Claude

If you are using Claude to execute or manage these migrations, you can simply paste the following instruction into Claude:

> *"Please review and execute the following SQL migration script on my Supabase project (`pbgiuuacirzzvgxumutl`). It updates the `papers` and `paper_requests` table constraints to support the 2019, 2023, and 2025 schemes, adds performance indexes for alphabetical subject sorting, adds a stored academic_year generated column, configures atomic download increment RPC, and establishes RLS policies for students and admins."*
