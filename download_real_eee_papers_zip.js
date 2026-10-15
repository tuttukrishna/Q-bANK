/**
 * ============================================================================
 * CUSAT SOE EEE — 1-CLICK REAL QUESTION PAPER DOWNLOADER & ZIP ORGANIZER
 * ============================================================================
 * How to use (takes 30 seconds, NO Python or installs needed):
 *   1. Open https://soe.cusat.ac.in/library/ in your browser (Chrome / Edge / Firefox).
 *   2. Press F12 (or right-click anywhere -> Inspect) and click the "Console" tab.
 *   3. Copy this entire file, paste it into the Console, and press Enter!
 *
 * What happens automatically:
 *   - A live blue progress bar appears at the top of the page.
 *   - Your browser downloads all 316 real EEE Question Paper PDFs for the
 *     2025, 2023, 2019, and 2015 Schemes (plus fixes the 22 broken filenames that
 *     were missing ".pdf" on the CUSAT server).
 *   - It arranges them into:
 *       1_2025_Scheme / Semester 1 .. Semester 8
 *       2_2023_Scheme / Semester 1 .. Semester 8
 *       3_2019_Scheme / Semester 1 .. Semester 8
 *       4_2015_Scheme / Semester 1 .. Semester 8
 *   - It packs everything into a single ZIP file:
 *       CUSAT_EEE_Real_Question_Papers_2025_2023_2019_2015.zip
 *     and automatically saves it to your Downloads folder!
 *   - Then you just unzip it and drag-and-drop each Semester folder straight
 *     into https://qbank-liart.vercel.app/#admin!
 * ============================================================================
 */

(async function runCusatEEEAutoDownloader() {
  // Set to true to include all 151 real 2015-Scheme papers (316 total)
  const INCLUDE_2015_SCHEME = true;
  const CONCURRENCY = 6;

  const PAPERS_2025_2023_2019 = [
  {
    "s": "2025",
    "sem": 1,
    "code": "25-200-0103",
    "title": "Introduction to Electronics Devices and Circuits",
    "yr": "2025",
    "fn": "25-200-0103 - Introduction to Electronics Devices and Circuits (November 2025).pdf",
    "u": "../questionpapers/Introduction to Electronics Devices and Circuits 2025 Nov (2025 Ad.).pdf"
  },
  {
    "s": "2025",
    "sem": 1,
    "code": "25-200-0104",
    "title": "Introduction to Electrical Engineering",
    "yr": "2025",
    "fn": "25-200-0104 - Introduction to Electrical Engineering (November 2025).pdf",
    "u": "../questionpapers/Introduction to Electrical Engineering 2025 Nov (2025 Ad.).pdf"
  },
  {
    "s": "2025",
    "sem": 1,
    "code": "25-200-0105",
    "title": "Computer Programming",
    "yr": "2025",
    "fn": "25-200-0105 - Computer Programming (November 2025).pdf",
    "u": "../questionpapers/Computer Programming 2025 Nov (2025 Ad.).pdf"
  },
  {
    "s": "2025",
    "sem": 3,
    "code": "23-209-0302",
    "title": "Electrical Machines",
    "yr": "2025",
    "fn": "23-209-0302 - Electrical Machines (November 1).pdf",
    "u": "../questionpapers/Electrical Machines -1 2025 Nov (2023 Ad.).pdf"
  },
  {
    "s": "2025",
    "sem": 3,
    "code": "23-209-0305",
    "title": "Analog and Integrated Circuits",
    "yr": "2025",
    "fn": "23-209-0305 - Analog and Integrated Circuits (November 1).pdf",
    "u": "../questionpapers/Analog and Integrated Circuits 1 2025 Nov (2023 Ad.).pdf"
  },
  {
    "s": "2023",
    "sem": 1,
    "code": "23-200-0102",
    "title": "Engineering Physics",
    "yr": "2024",
    "fn": "23-200-0102 - Engineering Physics (June 2024) [2].pdf",
    "u": "../questionpapers/Engineering Physics 2024 June (2023 Ad.).pdf"
  },
  {
    "s": "2023",
    "sem": 1,
    "code": "23-200-0102",
    "title": "Engineering Physics",
    "yr": "2024",
    "fn": "23-200-0102 - Engineering Physics (June 2024).pdf",
    "u": "../questionpapers/Engineering Physics 2024 June (2023 Ad.).pdf.pdf"
  },
  {
    "s": "2023",
    "sem": 1,
    "code": "23-200-0102",
    "title": "Engineering Physics",
    "yr": "2023",
    "fn": "23-200-0102 - Engineering Physics (November 2023).pdf",
    "u": "../questionpapers/Engineering Physics 2023 Nov (2023 Ad.).pdf"
  },
  {
    "s": "2023",
    "sem": 1,
    "code": "23-200-0103",
    "title": "Introduction to Electronic Devices and Circuits",
    "yr": "2023",
    "fn": "23-200-0103 - Introduction to Electronic Devices and Circuits (November 2023) [2].pdf",
    "u": "../questionpapers/Introduction to Electronic Devices and Circuits 2023 Nov (2023 Ad.).pdf"
  },
  {
    "s": "2023",
    "sem": 1,
    "code": "23-200-0103",
    "title": "Introduction to Electronic Devices and Circuits",
    "yr": "2023",
    "fn": "23-200-0103 - Introduction to Electronic Devices and Circuits (November 2023).pdf",
    "u": "../questionpapers/Introduction to Electronic Devices and Circuits2023 Nov (2023 Ad.).pdf"
  },
  {
    "s": "2023",
    "sem": 1,
    "code": "23-200-0103",
    "title": "Introduction to Electronics Devices and Circuits",
    "yr": "2024",
    "fn": "23-200-0103 - Introduction to Electronics Devices and Circuits (2024) [2].pdf",
    "u": "../questionpapers/Introduction to Electronics Devices and Circuits 2024 (2023 Ad.).pdf"
  },
  {
    "s": "2023",
    "sem": 1,
    "code": "23-200-0103",
    "title": "Introduction to Electronics Devices and Circuits",
    "yr": "2024",
    "fn": "23-200-0103 - Introduction to Electronics Devices and Circuits (2024).pdf",
    "u": "../questionpapers/Introduction to Electronics Devices and Circuits 2024 (2023 Ad.).pdf.pdf"
  },
  {
    "s": "2023",
    "sem": 1,
    "code": "23-200-0104",
    "title": "Introduction to Electrical Engineering",
    "yr": "2024",
    "fn": "23-200-0104 - Introduction to Electrical Engineering (June 2024) [2].pdf",
    "u": "../questionpapers/Introduction to Electrical Engineering 2024 June (2023 Ad.).pdf"
  },
  {
    "s": "2023",
    "sem": 1,
    "code": "23-200-0104",
    "title": "Introduction to Electrical Engineering",
    "yr": "2024",
    "fn": "23-200-0104 - Introduction to Electrical Engineering (June 2024).pdf",
    "u": "../questionpapers/Introduction to Electrical Engineering 2024 June (2023 Ad.).pdf.pdf"
  },
  {
    "s": "2023",
    "sem": 1,
    "code": "23-200-0105",
    "title": "Computer Programming",
    "yr": "2023",
    "fn": "23-200-0105 - Computer Programming (November 2023) [2].pdf",
    "u": "../questionpapers/Computer Programming 2023 Nov (2023 Ad.).pdf"
  },
  {
    "s": "2023",
    "sem": 1,
    "code": "23-200-0105",
    "title": "Computer Programming",
    "yr": "2023",
    "fn": "23-200-0105 - Computer Programming (November 2023).pdf",
    "u": "../questionpapers/Computer Programming 2023 Nov (2023Ad.).pdf"
  },
  {
    "s": "2023",
    "sem": 2,
    "code": "23-200-0202",
    "title": "Engineering Chemistry",
    "yr": "2024",
    "fn": "23-200-0202 - Engineering Chemistry (July 2024) [2].pdf",
    "u": "../questionpapers/Engineering Chemistry 2024 July  (2023 Ad.).pdf.pdf"
  },
  {
    "s": "2023",
    "sem": 2,
    "code": "23-200-0202",
    "title": "Engineering Chemistry",
    "yr": "2024",
    "fn": "23-200-0202 - Engineering Chemistry (July 2024).pdf",
    "u": "../questionpapers/Engineering Chemistry 2024 July (2023 Ad.).pdf"
  },
  {
    "s": "2023",
    "sem": 2,
    "code": "23-200-0203",
    "title": "Digital Electronics",
    "yr": "2024",
    "fn": "23-200-0203 - Digital Electronics (July 2024) [2].pdf",
    "u": "../questionpapers/Digital Electronics  2024 July  (2023 Ad.)_0001_0001.pdf"
  },
  {
    "s": "2023",
    "sem": 2,
    "code": "23-200-0203",
    "title": "Digital Electronics",
    "yr": "2024",
    "fn": "23-200-0203 - Digital Electronics (July 2024).pdf",
    "u": "../questionpapers/Digital Electronics 2024 July (2023 Ad.).pdf"
  },
  {
    "s": "2023",
    "sem": 2,
    "code": "23-200-0204",
    "title": "Object Oriented Progamming in C++",
    "yr": "2024",
    "fn": "23-200-0204 - Object Oriented Progamming in C (July 2024) [2].pdf",
    "u": "../questionpapers/Object Oriented Progamming in C++ 2024 July  (2023 Ad.)_0001.pdf"
  },
  {
    "s": "2023",
    "sem": 2,
    "code": "23-200-0204",
    "title": "Object Oriented Progamming in C++",
    "yr": "2024",
    "fn": "23-200-0204 - Object Oriented Progamming in C (July 2024).pdf",
    "u": "../questionpapers/Object Oriented Progamming in C++ 2024 July (2023 Ad.).pdf"
  },
  {
    "s": "2023",
    "sem": 2,
    "code": "23-200-0205",
    "title": "Introduction to Cyber Physical Systems",
    "yr": "2024",
    "fn": "23-200-0205 - Introduction to Cyber Physical Systems (July 2024) [2].pdf",
    "u": "../questionpapers/Introduction to Cyber Physical Systems  2024 July (2023 Ad).pdf"
  },
  {
    "s": "2023",
    "sem": 2,
    "code": "23-200-0205",
    "title": "Introduction to Cyber Physical Systems",
    "yr": "2024",
    "fn": "23-200-0205 - Introduction to Cyber Physical Systems (July 2024).pdf",
    "u": "../questionpapers/Introduction to Cyber Physical Systems 2024 July (2023 Ad.).pdf"
  },
  {
    "s": "2023",
    "sem": 2,
    "code": "23-200-0206",
    "title": "Environmental and Life Sciences",
    "yr": "2024",
    "fn": "23-200-0206 - Environmental and Life Sciences (July 2024).pdf",
    "u": "../questionpapers/Environmental and Life Sciences 2024 July (2023 Ad.).pdf"
  },
  {
    "s": "2023",
    "sem": 2,
    "code": "23-200-0206",
    "title": "Environmental and Life Sciences EE EC CS IT",
    "yr": "2024",
    "fn": "23-200-0206 - Environmental and Life Sciences EE EC CS IT (July 2024).pdf",
    "u": "../questionpapers/Environmental  and Life Sciences EE EC CS IT   2024 July  (2023 Ad.).pdf"
  },
  {
    "s": "2023",
    "sem": 3,
    "code": "23-209-0303",
    "title": "Circuits and Networks",
    "yr": "2025",
    "fn": "23-209-0303 - Circuits and Networks (November 2025).pdf",
    "u": "../questionpapers/Circuits and Networks 2025 Nov (2023 Ad.).pdf"
  },
  {
    "s": "2023",
    "sem": 3,
    "code": "23-209-0304",
    "title": "Measurements and Instrumentation",
    "yr": "2024",
    "fn": "23-209-0304 - Measurements and Instrumentation (November 2024).pdf",
    "u": "../questionpapers/Measurements and Instrumentation. 2024 Nov (2023 Ad.).pdf"
  },
  {
    "s": "2023",
    "sem": 3,
    "code": "23-209-0304",
    "title": "Measurements and Instrumentation",
    "yr": "2025",
    "fn": "23-209-0304 - Measurements and Instrumentation (November 2025).pdf",
    "u": "../questionpapers/Measurements and Instrumentation  2025 Nov (2023 Ad.).pdf"
  },
  {
    "s": "2023",
    "sem": 3,
    "code": "23-209-0305",
    "title": "Analogue Integrated Circuit",
    "yr": "2024",
    "fn": "23-209-0305 - Analogue Integrated Circuit (November 2024).pdf",
    "u": "../questionpapers/Analogue Integrated Circuit .2024 Nov (2023 Ad.).pdf"
  },
  {
    "s": "2023",
    "sem": 3,
    "code": "23-209-0306",
    "title": "Microprocessor and Microcontrolled Based Systems",
    "yr": "2025",
    "fn": "23-209-0306 - Microprocessor and Microcontrolled Based Systems (November 2025).pdf",
    "u": "../questionpapers/Microprocessor and Microcontrolled Based Systems 2025 Nov (2023 Ad.).pdf"
  },
  {
    "s": "2023",
    "sem": 3,
    "code": "23-209-0306",
    "title": "Microprocessor and Microcontroller Based Systems",
    "yr": "2024",
    "fn": "23-209-0306 - Microprocessor and Microcontroller Based Systems (November 2024).pdf",
    "u": "../questionpapers/Microprocessor and Microcontroller Based Systems. 2024 Nov (2023 Ad.).pdf"
  },
  {
    "s": "2023",
    "sem": 3,
    "code": "23-209-0310",
    "title": "Fundamentals of Electrical Machines",
    "yr": "2024",
    "fn": "23-209-0310 - Fundamentals of Electrical Machines (November 2024).pdf",
    "u": "../questionpapers/Fundamentals of Electrical Machines. 2024 Nov (2023 Ad.).pdf"
  },
  {
    "s": "2023",
    "sem": 4,
    "code": "23-202-0410",
    "title": "Foundation for Machine Learning",
    "yr": "2025",
    "fn": "23-202-0410 - Foundation for Machine Learning (April 2025) [2].pdf",
    "u": "../questionpapers/Foundation for Machine Learning 2025 April(2023 Ad.).pdf"
  },
  {
    "s": "2023",
    "sem": 4,
    "code": "23-202-0410",
    "title": "Foundation for Machine Learning",
    "yr": "2025",
    "fn": "23-202-0410 - Foundation for Machine Learning (April 2025) [3].pdf",
    "u": "../questionpapers/Foundation for Machine Learning 2025 April (2023 Ad.).pdf"
  },
  {
    "s": "2023",
    "sem": 4,
    "code": "23-202-0410",
    "title": "Foundation for Machine Learning",
    "yr": "2025",
    "fn": "23-202-0410 - Foundation for Machine Learning (April 2025).pdf",
    "u": "../questionpapers/Foundation for Machine Learning 2025 April(Ad.2023).pdf"
  },
  {
    "s": "2023",
    "sem": 4,
    "code": "23-203-0410",
    "title": "Signal Processing",
    "yr": "2025",
    "fn": "23-203-0410 - Signal Processing (April 2025) [2].pdf",
    "u": "../questionpapers/Signal Processing 2025 April(2023 Ad.).pdf"
  },
  {
    "s": "2023",
    "sem": 4,
    "code": "23-203-0410",
    "title": "Signal Processing",
    "yr": "2025",
    "fn": "23-203-0410 - Signal Processing (April 2025) [3].pdf",
    "u": "../questionpapers/Signal Processing 2025 April (2023 Ad.).pdf"
  },
  {
    "s": "2023",
    "sem": 4,
    "code": "23-203-0410",
    "title": "Signal Processing",
    "yr": "2025",
    "fn": "23-203-0410 - Signal Processing (April 2025).pdf",
    "u": "../questionpapers/Signal Processing 2025 April(Ad.2023).pdf"
  },
  {
    "s": "2023",
    "sem": 4,
    "code": "23-206-0410",
    "title": "Fire Protection Engineering",
    "yr": "2025",
    "fn": "23-206-0410 - Fire Protection Engineering (April 2025) [2].pdf",
    "u": "../questionpapers/Fire Protection Engineering 2025 April(2023 Ad.).pdf"
  },
  {
    "s": "2023",
    "sem": 4,
    "code": "23-206-0410",
    "title": "Fire Protection Engineering",
    "yr": "2025",
    "fn": "23-206-0410 - Fire Protection Engineering (April 2025) [3].pdf",
    "u": "../questionpapers/Fire Protection Engineering 2025 April (2023 Ad.).pdf"
  },
  {
    "s": "2023",
    "sem": 4,
    "code": "23-206-0410",
    "title": "Fire Protection Engineering",
    "yr": "2025",
    "fn": "23-206-0410 - Fire Protection Engineering (April 2025).pdf",
    "u": "../questionpapers/Fire Protection Engineering 2025 April(Ad.2023).pdf"
  },
  {
    "s": "2023",
    "sem": 4,
    "code": "23-209-0403",
    "title": "Electrical Machines II",
    "yr": "2025",
    "fn": "23-209-0403 - Electrical Machines II (April 2025) [2].pdf",
    "u": "../questionpapers/Electrical Machines II 2025 April (2023 Ad.).pdf"
  },
  {
    "s": "2023",
    "sem": 4,
    "code": "23-209-0403",
    "title": "Electrical Machines II",
    "yr": "2025",
    "fn": "23-209-0403 - Electrical Machines II (April 2025).pdf",
    "u": "../questionpapers/Electrical Machines II 2025 April(Ad.2023).pdf"
  },
  {
    "s": "2023",
    "sem": 4,
    "code": "23-209-0404",
    "title": "Power Electronics",
    "yr": "2025",
    "fn": "23-209-0404 - Power Electronics (April 2025) [2].pdf",
    "u": "../questionpapers/Power Electronics 2025 April (2023 Ad.).pdf"
  },
  {
    "s": "2023",
    "sem": 4,
    "code": "23-209-0404",
    "title": "Power Electronics",
    "yr": "2025",
    "fn": "23-209-0404 - Power Electronics (April 2025).pdf",
    "u": "../questionpapers/Power Electronics 2025 April(Ad.2023).pdf"
  },
  {
    "s": "2023",
    "sem": 4,
    "code": "23-209-0405",
    "title": "Electromagnetic Theory",
    "yr": "2025",
    "fn": "23-209-0405 - Electromagnetic Theory (April 2025) [2].pdf",
    "u": "../questionpapers/Electromagnetic Theory 2025 April  (2023 Ad.).pdf"
  },
  {
    "s": "2023",
    "sem": 4,
    "code": "23-209-0405",
    "title": "Electromagnetic Theory",
    "yr": "2025",
    "fn": "23-209-0405 - Electromagnetic Theory (April 2025).pdf",
    "u": "../questionpapers/Electromagnetic Theory 2025 April(Ad.2023) (2).pdf"
  },
  {
    "s": "2023",
    "sem": 4,
    "code": "23-209-0406",
    "title": "Analog Integrated Circuit II",
    "yr": "2025",
    "fn": "23-209-0406 - Analog Integrated Circuit II (April 2025) [2].pdf",
    "u": "../questionpapers/Analog Integrated Circuit II 2025 April (2023 Ad.).pdf"
  },
  {
    "s": "2023",
    "sem": 4,
    "code": "23-209-0406",
    "title": "Analog Integrated Circuit II",
    "yr": "2025",
    "fn": "23-209-0406 - Analog Integrated Circuit II (April 2025).pdf",
    "u": "../questionpapers/Analog Integrated Circuit II 2025 April(Ad.2023).pdf"
  },
  {
    "s": "2023",
    "sem": 5,
    "code": "23-209-0501",
    "title": "Power semicomductor drives Nov",
    "yr": "2025",
    "fn": "23-209-0501 - Power semicomductor drives Nov (November 2025).pdf",
    "u": "../questionpapers/Power semicomductor drives Nov 2025 (2023 Ad.).pdf"
  },
  {
    "s": "2023",
    "sem": 5,
    "code": "23-209-0502",
    "title": "Control Systems-I",
    "yr": "2025",
    "fn": "23-209-0502 - Control Systems-I (November 2025).pdf",
    "u": "../questionpapers/Control Systems-I. 2025 Nov (2023 Ad.).pdf"
  },
  {
    "s": "2023",
    "sem": 5,
    "code": "23-209-0503",
    "title": "Renewable Energy Sources",
    "yr": "2025",
    "fn": "23-209-0503 - Renewable Energy Sources (November 2025).pdf",
    "u": "../questionpapers/Renewable Energy Sources. 2025 Nov (2023 Ad.).pdf"
  },
  {
    "s": "2023",
    "sem": 5,
    "code": "23-209-0504",
    "title": "Digital Signal Processing",
    "yr": "2025",
    "fn": "23-209-0504 - Digital Signal Processing (November 2025).pdf",
    "u": "../questionpapers/Digital Signal Processing. 2025 Nov (2023 Ad.).pdf"
  },
  {
    "s": "2023",
    "sem": 5,
    "code": "23-209-0505",
    "title": "Power Systems I",
    "yr": "2025",
    "fn": "23-209-0505 - Power Systems I (November 2025).pdf",
    "u": "../questionpapers/Power Systems I. 2025 Nov (2023 Ad.).pdf"
  },
  {
    "s": "2023",
    "sem": 5,
    "code": "23-209-0506(IE)",
    "title": "Industrial Automation",
    "yr": "2025",
    "fn": "23-209-0506(IE) - Industrial Automation (November 2025).pdf",
    "u": "../questionpapers/Industrial Automation. 2025 Nov (2023 Ad.).pdf"
  },
  {
    "s": "2023",
    "sem": 6,
    "code": "23-209-0604",
    "title": "Machine Learning",
    "yr": "2025",
    "fn": "23-209-0604 - Machine Learning (April 2025).pdf",
    "u": "../questionpapers/Machine   Learning 2025 April(Ad.2023).pdf"
  },
  {
    "s": "2019",
    "sem": 3,
    "code": "19-200-0301",
    "title": "Linear Algebra and Transform Techniques",
    "yr": "2022",
    "fn": "19-200-0301 - Linear Algebra and Transform Techniques (February 2022).pdf",
    "u": "../questionpapers/Linear Algebra and Transform Techniques 2022 February (2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 3,
    "code": "19-200-0301",
    "title": "Linear Algebra and Transform Techniques",
    "yr": "2023",
    "fn": "19-200-0301 - Linear Algebra and Transform Techniques (November 2023).pdf",
    "u": "../questionpapers/Linear Algebra and Transform Techniques 2023 Nov  (2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 3,
    "code": "19-209-0302",
    "title": "Electrical Machines I",
    "yr": "2022",
    "fn": "19-209-0302 - Electrical Machines I (February 2022).pdf",
    "u": "../questionpapers/Electrical Machines  I 2022 February (2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 3,
    "code": "19-209-0302",
    "title": "Electrical Machines I",
    "yr": "2024",
    "fn": "19-209-0302 - Electrical Machines I (July 2024).pdf",
    "u": "../questionpapers/Electrical Machines  I 2024 july  (2019 Ad.)_0001.pdf"
  },
  {
    "s": "2019",
    "sem": 3,
    "code": "19-209-0303",
    "title": "Circuits and Networks",
    "yr": "2022",
    "fn": "19-209-0303 - Circuits and Networks (February 2022).pdf",
    "u": "../questionpapers/Circuits and Networks  2022 February (2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 3,
    "code": "19-209-0303",
    "title": "Circuits and Networks",
    "yr": "2024",
    "fn": "19-209-0303 - Circuits and Networks (July 2024).pdf",
    "u": "../questionpapers/Circuits and Networks  2024 July (2019 Ad.)_0001.pdf"
  },
  {
    "s": "2019",
    "sem": 3,
    "code": "19-209-0304",
    "title": "Electrical Measurements and Measuring Instruments",
    "yr": "2022",
    "fn": "19-209-0304 - Electrical Measurements and Measuring Instruments (February 2022).pdf",
    "u": "../questionpapers/Electrical Measurements and Measuring Instruments  2022 February (2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 3,
    "code": "19-209-0304",
    "title": "Electrical Measurements and Measuring Instruments",
    "yr": "2024",
    "fn": "19-209-0304 - Electrical Measurements and Measuring Instruments (July 2024).pdf",
    "u": "../questionpapers/Electrical Measurements and Measuring Instruments  2024 July (2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 3,
    "code": "19-209-0304",
    "title": "Electrical Measurements and Measuring Instruments",
    "yr": "2023",
    "fn": "19-209-0304 - Electrical Measurements and Measuring Instruments (November 2023).pdf",
    "u": "../questionpapers/Electrical Measurements and Measuring Instruments  2023 Nov (2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 3,
    "code": "19-209-0305",
    "title": "Electronics Devices and Circuits",
    "yr": "2022",
    "fn": "19-209-0305 - Electronics Devices and Circuits (February 2022).pdf",
    "u": "../questionpapers/Electronics Devices and Circuits  2022 February (2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 3,
    "code": "19-209-0306",
    "title": "Electrical Engineering Materials",
    "yr": "2022",
    "fn": "19-209-0306 - Electrical Engineering Materials (February 2022).pdf",
    "u": "../questionpapers/Electrical Engineering Materials  2022 February (2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 3,
    "code": "19-209-0306",
    "title": "Electrical Engineering Materials",
    "yr": "2024",
    "fn": "19-209-0306 - Electrical Engineering Materials (July 2024).pdf",
    "u": "../questionpapers/Electrical Engineering Materials  2024 July  (2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 3,
    "code": "19-209-0306",
    "title": "Electrical Engineering Materials",
    "yr": "2025",
    "fn": "19-209-0306 - Electrical Engineering Materials (November 2025).pdf",
    "u": "../questionpapers/Electrical Engineering Materials 2025 Nov(2019Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 4,
    "code": "19-209-0402",
    "title": "Circuits, Signals and Systems",
    "yr": "2026",
    "fn": "19-209-0402 - Circuits Signals and Systems (April 2026).pdf",
    "u": "../questionpapers/Circuits, Signals and Systems 2026 Apr (2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 4,
    "code": "19-209-0402",
    "title": "Circuits, Signals and Systems",
    "yr": "2022",
    "fn": "19-209-0402 - Circuits Signals and Systems (June 2022).pdf",
    "u": "../questionpapers/Circuits, Signals and Systems 2022 June (2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 4,
    "code": "19-209-0402",
    "title": "Circuits, Signals and Systems",
    "yr": "2024",
    "fn": "19-209-0402 - Circuits Signals and Systems (June 2024).pdf",
    "u": "../questionpapers/Circuits, Signals and Systems 2024 June (2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 4,
    "code": "19-209-0403",
    "title": "Electrical Machines II",
    "yr": "2026",
    "fn": "19-209-0403 - Electrical Machines II (April 2026).pdf",
    "u": "../questionpapers/Electrical Machines II 2026 Apr (2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 4,
    "code": "19-209-0403",
    "title": "Electrical Machines II",
    "yr": "2022",
    "fn": "19-209-0403 - Electrical Machines II (June 2022).pdf",
    "u": "../questionpapers/Electrical Machines II 2022 June (2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 4,
    "code": "19-209-0403",
    "title": "Electrical Machines II",
    "yr": "2024",
    "fn": "19-209-0403 - Electrical Machines II (June 2024).pdf",
    "u": "../questionpapers/Electrical Machines II 2024 June (2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 4,
    "code": "19-209-0404",
    "title": "Power Electronics",
    "yr": "2026",
    "fn": "19-209-0404 - Power Electronics (April 2026).pdf",
    "u": "../questionpapers/Power Electronics 2026 Apr (2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 4,
    "code": "19-209-0404",
    "title": "Power Electronics",
    "yr": "2022",
    "fn": "19-209-0404 - Power Electronics (June 2022).pdf",
    "u": "../questionpapers/Power Electronics 2022 June (2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 4,
    "code": "19-209-0404",
    "title": "Power Electronics",
    "yr": "2024",
    "fn": "19-209-0404 - Power Electronics (June 2024).pdf",
    "u": "../questionpapers/Power Electronics 2024 June (2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 4,
    "code": "19-209-0405",
    "title": "Digital Electronics",
    "yr": "2026",
    "fn": "19-209-0405 - Digital Electronics (April 2026).pdf",
    "u": "../questionpapers/Digital Electronics 2026 Apr (2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 4,
    "code": "19-209-0405",
    "title": "Digital Electronics",
    "yr": "2022",
    "fn": "19-209-0405 - Digital Electronics (June 2022).pdf",
    "u": "../questionpapers/Digital Electronics 2022 June (2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 4,
    "code": "19-209-0405",
    "title": "Digital Electronics",
    "yr": "2024",
    "fn": "19-209-0405 - Digital Electronics (June 2024).pdf",
    "u": "../questionpapers/Digital Electronics 2024 June (2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 4,
    "code": "19-209-0406",
    "title": "Electromagnetic Field Theory",
    "yr": "2022",
    "fn": "19-209-0406 - Electromagnetic Field Theory (June 2022).pdf",
    "u": "../questionpapers/Electromagnetic Field Theory 2022 June (2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 4,
    "code": "19-209-0406",
    "title": "Electromagnetic Field Theory",
    "yr": "2024",
    "fn": "19-209-0406 - Electromagnetic Field Theory (June 2024).pdf",
    "u": "../questionpapers/Electromagnetic Field Theory 2024 June (2019 Ad.)_0001.pdf"
  },
  {
    "s": "2019",
    "sem": 5,
    "code": "19-200-0501",
    "title": "Numerical And Statistical methods",
    "yr": "2021",
    "fn": "19-200-0501 - Numerical And Statistical methods (November 2021) [2].pdf",
    "u": "../questionpapers/Numerical And Statistical methods 2021 Nov (2019 Ad).pdf"
  },
  {
    "s": "2019",
    "sem": 5,
    "code": "19-200-0501",
    "title": "Numerical and Statistical Methods",
    "yr": "2021",
    "fn": "19-200-0501 - Numerical and Statistical Methods (November 2021).pdf",
    "u": "../questionpapers/Numerical and Statistical Methods 2021 Nov.(2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 5,
    "code": "19-200-0501",
    "title": "Numerical and statastical Method",
    "yr": "2021",
    "fn": "19-200-0501 - Numerical and statastical Method (November 2021) [2].pdf",
    "u": "../questionpapers/Numerical and statastical Method 2021 Nov (2019 Ad).pdf"
  },
  {
    "s": "2019",
    "sem": 5,
    "code": "19-200-0501",
    "title": "Numerical and statastical Method",
    "yr": "2021",
    "fn": "19-200-0501 - Numerical and statastical Method (November 2021).pdf",
    "u": "../questionpapers/Numerical and statastical Method 2021 Novl (2019 Ad).pdf"
  },
  {
    "s": "2019",
    "sem": 5,
    "code": "19-209-0502",
    "title": "Control System I",
    "yr": "2024",
    "fn": "19-209-0502 - Control System I (June 2024) [2].pdf",
    "u": "../questionpapers/Control System I 2024 June (2019 Ad.) - Copy.pdf"
  },
  {
    "s": "2019",
    "sem": 5,
    "code": "19-209-0502",
    "title": "Control System I",
    "yr": "2024",
    "fn": "19-209-0502 - Control System I (June 2024).pdf",
    "u": "../questionpapers/Control System I 2024 June (2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 5,
    "code": "19-209-0502",
    "title": "Control Systems I",
    "yr": "2023",
    "fn": "19-209-0502 - Control Systems I (January 2023) [2].pdf",
    "u": "../questionpapers/Control Systems I 2023 Janu (2019 Ad) - Copy.pdf"
  },
  {
    "s": "2019",
    "sem": 5,
    "code": "19-209-0502",
    "title": "Control Systems I",
    "yr": "2023",
    "fn": "19-209-0502 - Control Systems I (January 2023).pdf",
    "u": "../questionpapers/Control Systems I 2023 Janu (2019 Ad).pdf"
  },
  {
    "s": "2019",
    "sem": 5,
    "code": "19-209-0502",
    "title": "Control Systems I",
    "yr": "2021",
    "fn": "19-209-0502 - Control Systems I (November 2021) [2].pdf",
    "u": "../questionpapers/Control Systems I 2021 Nov (2019 Ad) - Copy.pdf"
  },
  {
    "s": "2019",
    "sem": 5,
    "code": "19-209-0502",
    "title": "Control Systems I",
    "yr": "2021",
    "fn": "19-209-0502 - Control Systems I (November 2021).pdf",
    "u": "../questionpapers/Control Systems I 2021 Nov (2019 Ad).pdf"
  },
  {
    "s": "2019",
    "sem": 5,
    "code": "19-209-0502",
    "title": "Control Systems I",
    "yr": "2025",
    "fn": "19-209-0502 - Control Systems I (November 2025).pdf",
    "u": "../questionpapers/Control Systems I 2025 Nov (2019 Ad).pdf"
  },
  {
    "s": "2019",
    "sem": 5,
    "code": "19-209-0502",
    "title": "Control Systems I",
    "yr": "2022",
    "fn": "19-209-0502 - Control Systems I (September 2022) [2].pdf",
    "u": "../questionpapers/Control Systems I 2022 Sept (2019 Ad) - Copy.pdf"
  },
  {
    "s": "2019",
    "sem": 5,
    "code": "19-209-0502",
    "title": "Control Systems I",
    "yr": "2022",
    "fn": "19-209-0502 - Control Systems I (September 2022).pdf",
    "u": "../questionpapers/Control Systems I 2022 Sept (2019 Ad).pdf"
  },
  {
    "s": "2019",
    "sem": 5,
    "code": "19-209-0503",
    "title": "Microprocessor and Microcontrolled Based Systems",
    "yr": "2023",
    "fn": "19-209-0503 - Microprocessor and Microcontrolled Based Systems (January 2023).pdf",
    "u": "../questionpapers/Microprocessor and Microcontrolled Based Systems 2023 Janu  (2019 Ad).pdf"
  },
  {
    "s": "2019",
    "sem": 5,
    "code": "19-209-0503",
    "title": "Microprocessor and Microcontrolled Based Systems",
    "yr": "2021",
    "fn": "19-209-0503 - Microprocessor and Microcontrolled Based Systems (November 2021).pdf",
    "u": "../questionpapers/Microprocessor and Microcontrolled Based Systems 2021 Nov (2019 Ad).pdf"
  },
  {
    "s": "2019",
    "sem": 5,
    "code": "19-209-0503",
    "title": "Microprocessor and Microcontrolled Based Systems",
    "yr": "2025",
    "fn": "19-209-0503 - Microprocessor and Microcontrolled Based Systems (November 2025).pdf",
    "u": "../questionpapers/Microprocessor and Microcontrolled Based Systems 2025 Nov (2019 Ad).pdf"
  },
  {
    "s": "2019",
    "sem": 5,
    "code": "19-209-0503",
    "title": "Microprocessor and Microcontrolled Based Systems",
    "yr": "2022",
    "fn": "19-209-0503 - Microprocessor and Microcontrolled Based Systems (September 2022).pdf",
    "u": "../questionpapers/Microprocessor and Microcontrolled Based Systems 2022 Sept (2019 Ad).pdf"
  },
  {
    "s": "2019",
    "sem": 5,
    "code": "19-209-0503",
    "title": "Microprocessor and Microcontroller Based Systems",
    "yr": "2024",
    "fn": "19-209-0503 - Microprocessor and Microcontroller Based Systems (June 2024).pdf",
    "u": "../questionpapers/Microprocessor and Microcontroller Based Systems 2024 June (2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 5,
    "code": "19-209-0504",
    "title": "Power Systems I",
    "yr": "2024",
    "fn": "19-209-0504 - Power Systems I (June 2024).pdf",
    "u": "../questionpapers/Power Systems I 2024 June (2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 5,
    "code": "19-209-0504",
    "title": "Power Systems I",
    "yr": "2021",
    "fn": "19-209-0504 - Power Systems I (November 2021).pdf",
    "u": "../questionpapers/Power Systems I 2021 Nov (2019 Scheme).pdf"
  },
  {
    "s": "2019",
    "sem": 5,
    "code": "19-209-0504",
    "title": "Power Systems I",
    "yr": "2022",
    "fn": "19-209-0504 - Power Systems I (September 2022).pdf",
    "u": "../questionpapers/Power Systems I 2022 Sept  (2019 Scheme).pdf"
  },
  {
    "s": "2019",
    "sem": 5,
    "code": "19-209-0505",
    "title": "Linear Integrated Circuits",
    "yr": "2024",
    "fn": "19-209-0505 - Linear Integrated Circuits (June 2024) [2].pdf",
    "u": "../questionpapers/Linear Integrated Circuits 2024 June (2019 Ad.) - Copy.pdf"
  },
  {
    "s": "2019",
    "sem": 5,
    "code": "19-209-0505",
    "title": "Linear Integrated Circuits",
    "yr": "2024",
    "fn": "19-209-0505 - Linear Integrated Circuits (June 2024).pdf",
    "u": "../questionpapers/Linear Integrated Circuits 2024 June (2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 5,
    "code": "19-209-0505",
    "title": "Linear integrated Circuits",
    "yr": "2023",
    "fn": "19-209-0505 - Linear integrated Circuits (January 2023) [2].pdf",
    "u": "../questionpapers/Linear integrated Circuits 2023 Janu (2019 Ad - Copy.)"
  },
  {
    "s": "2019",
    "sem": 5,
    "code": "19-209-0505",
    "title": "Linear integrated Circuits",
    "yr": "2023",
    "fn": "19-209-0505 - Linear integrated Circuits (January 2023) [3].pdf",
    "u": "../questionpapers/Linear integrated Circuits 2023 Janu  (2019 Ad.)"
  },
  {
    "s": "2019",
    "sem": 5,
    "code": "19-209-0505",
    "title": "Linear integrated Circuits",
    "yr": "2023",
    "fn": "19-209-0505 - Linear integrated Circuits (January 2023) [4].pdf",
    "u": "../questionpapers/Linear integrated Circuits 2023 Janu  (2019 Ad - Copy.)"
  },
  {
    "s": "2019",
    "sem": 5,
    "code": "19-209-0505",
    "title": "Linear integrated Circuits",
    "yr": "2023",
    "fn": "19-209-0505 - Linear integrated Circuits (January 2023).pdf",
    "u": "../questionpapers/Linear integrated Circuits 2023 Janu (2019 Ad.)"
  },
  {
    "s": "2019",
    "sem": 5,
    "code": "19-209-0505",
    "title": "Linear integrated Circuits",
    "yr": "2021",
    "fn": "19-209-0505 - Linear integrated Circuits (November 2021) [2].pdf",
    "u": "../questionpapers/Linear integrated Circuits 2021 Nov (2019 Ad.) - Copy.pdf"
  },
  {
    "s": "2019",
    "sem": 5,
    "code": "19-209-0505",
    "title": "Linear integrated Circuits",
    "yr": "2021",
    "fn": "19-209-0505 - Linear integrated Circuits (November 2021).pdf",
    "u": "../questionpapers/Linear integrated Circuits 2021 Nov (2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 5,
    "code": "19-209-0505",
    "title": "Linear integrated Circuits",
    "yr": "2022",
    "fn": "19-209-0505 - Linear integrated Circuits (September 2022) [2].pdf",
    "u": "../questionpapers/Linear integrated Circuits 2022 Sept (2019 Ad.) - Copy.pdf"
  },
  {
    "s": "2019",
    "sem": 5,
    "code": "19-209-0505",
    "title": "Linear integrated Circuits",
    "yr": "2022",
    "fn": "19-209-0505 - Linear integrated Circuits (September 2022).pdf",
    "u": "../questionpapers/Linear integrated Circuits 2022 Sept (2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 5,
    "code": "19-209-0506(IE)",
    "title": "Introduction to Machine Learning",
    "yr": "2024",
    "fn": "19-209-0506(IE) - Introduction to Machine Learning (June 2024).pdf",
    "u": "../questionpapers/Introduction to Machine Learning 2024 June (2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 5,
    "code": "19-209-0506(IE)",
    "title": "Introduction to Machine Learning",
    "yr": "2021",
    "fn": "19-209-0506(IE) - Introduction to Machine Learning (November 2021).pdf",
    "u": "../questionpapers/Introduction to Machine Learning2021 Nov (2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 5,
    "code": "19-209-0506(IE)",
    "title": "Introduction to Machine Learning",
    "yr": "2022",
    "fn": "19-209-0506(IE) - Introduction to Machine Learning (November 2022).pdf",
    "u": "../questionpapers/Introduction to Machine Learning2022 Nov (2019 Ad.)"
  },
  {
    "s": "2019",
    "sem": 5,
    "code": "19-209-0506(IE)",
    "title": "Introduction to Machine Learning",
    "yr": "2022",
    "fn": "19-209-0506(IE) - Introduction to Machine Learning (September 2022) [2].pdf",
    "u": "../questionpapers/Introduction to Machine Learning 2022 Sept  (2019 Ad.)"
  },
  {
    "s": "2019",
    "sem": 5,
    "code": "19-209-0506(IE)",
    "title": "Introduction to Machine Learning",
    "yr": "2022",
    "fn": "19-209-0506(IE) - Introduction to Machine Learning (September 2022) [3].pdf",
    "u": "../questionpapers/Introduction to Machine Learning 2022 Sept  (2019 Ad - Copy.)"
  },
  {
    "s": "2019",
    "sem": 5,
    "code": "19-209-0506(IE)",
    "title": "Introduction to Machine Learning",
    "yr": "2022",
    "fn": "19-209-0506(IE) - Introduction to Machine Learning (September 2022).pdf",
    "u": "../questionpapers/Introduction to Machine Learning 2022 Sept (2019 Ad.)"
  },
  {
    "s": "2019",
    "sem": 5,
    "code": "19-209-0507",
    "title": "Special Electric Machines",
    "yr": "2021",
    "fn": "19-209-0507 - Special Electric Machines (November 2021).pdf",
    "u": "../questionpapers/Special Electric Machines 2021 Nov (2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 5,
    "code": "19-209-0509",
    "title": "Electrical Safety",
    "yr": "2024",
    "fn": "19-209-0509 - Electrical Safety (June 2024) [2].pdf",
    "u": "../questionpapers/Electrical Safety 2024 June (2019 Ad.) - Copy.pdf"
  },
  {
    "s": "2019",
    "sem": 5,
    "code": "19-209-0509",
    "title": "Electrical Safety",
    "yr": "2024",
    "fn": "19-209-0509 - Electrical Safety (June 2024).pdf",
    "u": "../questionpapers/Electrical Safety 2024 June (2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 6,
    "code": "19-209-0601",
    "title": "Electric Drives",
    "yr": "2022",
    "fn": "19-209-0601 - Electric Drives (April 2022) [2].pdf",
    "u": "../questionpapers/Electric Drives 2022 April (2019 Ad. )"
  },
  {
    "s": "2019",
    "sem": 6,
    "code": "19-209-0601",
    "title": "Electric Drives",
    "yr": "2022",
    "fn": "19-209-0601 - Electric Drives (April 2022).pdf",
    "u": "../questionpapers/Electric Drives 2022 April (2019 Ad. ).pdf"
  },
  {
    "s": "2019",
    "sem": 6,
    "code": "19-209-0601",
    "title": "Electric Drives",
    "yr": "2026",
    "fn": "19-209-0601 - Electric Drives (April 2026).pdf",
    "u": "../questionpapers/Electric Drives 2026 Apr (2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 6,
    "code": "19-209-0601",
    "title": "Electric drives",
    "yr": "2022",
    "fn": "19-209-0601 - Electric drives (November 2022).pdf",
    "u": "../questionpapers/Electric drives 2022 Nov (2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 6,
    "code": "19-209-0602",
    "title": "Digital Signal Processing",
    "yr": "2022",
    "fn": "19-209-0602 - Digital Signal Processing (April 2022).pdf",
    "u": "../questionpapers/Digital Signal Processing 2022 April (2019 Ad. )"
  },
  {
    "s": "2019",
    "sem": 6,
    "code": "19-209-0602",
    "title": "Digital Signal Processing",
    "yr": "2026",
    "fn": "19-209-0602 - Digital Signal Processing (April 2026).pdf",
    "u": "../questionpapers/Digital Signal Processing 2026 Apr (2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 6,
    "code": "19-209-0602",
    "title": "Digital signal processing",
    "yr": "2022",
    "fn": "19-209-0602 - Digital signal processing (November 2022).pdf",
    "u": "../questionpapers/Digital signal processing 2022 Nov (2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 6,
    "code": "19-209-0603",
    "title": "Power Systems II",
    "yr": "2022",
    "fn": "19-209-0603 - Power Systems II (April 2022) [2].pdf",
    "u": "../questionpapers/Power Systems II  2022 April (2019 Ad) A.pdf"
  },
  {
    "s": "2019",
    "sem": 6,
    "code": "19-209-0603",
    "title": "Power Systems II",
    "yr": "2022",
    "fn": "19-209-0603 - Power Systems II (April 2022).pdf",
    "u": "../questionpapers/Power Systems II  2022 April (2019 Ad) B.pdf"
  },
  {
    "s": "2019",
    "sem": 6,
    "code": "19-209-0603",
    "title": "Power Systems II",
    "yr": "2026",
    "fn": "19-209-0603 - Power Systems II (April 2026).pdf",
    "u": "../questionpapers/Power Systems II 2026 Apr (2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 6,
    "code": "19-209-0603",
    "title": "Power Systems II",
    "yr": "2023",
    "fn": "19-209-0603 - Power Systems II (June 2023) [2].pdf",
    "u": "../questionpapers/Power Systems II  2023 June  (2019 Ad) 1.pdf"
  },
  {
    "s": "2019",
    "sem": 6,
    "code": "19-209-0603",
    "title": "Power Systems II",
    "yr": "2023",
    "fn": "19-209-0603 - Power Systems II (June 2023).pdf",
    "u": "../questionpapers/Power Systems II  2023 June  (2019 Ad).pdf"
  },
  {
    "s": "2019",
    "sem": 6,
    "code": "19-209-0603",
    "title": "Power systems II",
    "yr": "2022",
    "fn": "19-209-0603 - Power systems II (November 2022).pdf",
    "u": "../questionpapers/Power systems II 2022 Nov(2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 6,
    "code": "19-209-0604",
    "title": "Electrical Drawing",
    "yr": "2022",
    "fn": "19-209-0604 - Electrical Drawing (April 2022).pdf",
    "u": "../questionpapers/Electrical  Drawing  2022 April (2019 Ad. ).pdf"
  },
  {
    "s": "2019",
    "sem": 6,
    "code": "19-209-0604",
    "title": "Electrical Drawing",
    "yr": "2026",
    "fn": "19-209-0604 - Electrical Drawing (April 2026).pdf",
    "u": "../questionpapers/Electrical Drawing 2026 Apr (2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 6,
    "code": "19-209-0604",
    "title": "Electrical Drawing",
    "yr": "2023",
    "fn": "19-209-0604 - Electrical Drawing (June 2023).pdf",
    "u": "../questionpapers/Electrical Drawing 2023 June  (2019 Ad.)"
  },
  {
    "s": "2019",
    "sem": 6,
    "code": "19-209-0604",
    "title": "Electrical Drawing",
    "yr": "2022",
    "fn": "19-209-0604 - Electrical Drawing (November 2022).pdf",
    "u": "../questionpapers/Electrical Drawing 2022 Nov (2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 6,
    "code": "19-209-0605",
    "title": "Control System II",
    "yr": "2023",
    "fn": "19-209-0605 - Control System II (June 2023).pdf",
    "u": "../questionpapers/Control System II 2023 June (2019 Ad).pdf"
  },
  {
    "s": "2019",
    "sem": 6,
    "code": "19-209-0605",
    "title": "Control Systems II",
    "yr": "2026",
    "fn": "19-209-0605 - Control Systems II (April 2026).pdf",
    "u": "../questionpapers/Control Systems II 2026 Apr (2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 6,
    "code": "19-209-0608",
    "title": "Soft Computing",
    "yr": "2022",
    "fn": "19-209-0608 - Soft Computing (April 2022).pdf",
    "u": "../questionpapers/Soft Computing 2022 April (2019 Ad).pdf"
  },
  {
    "s": "2019",
    "sem": 6,
    "code": "19-209-0608",
    "title": "Soft Computing",
    "yr": "2026",
    "fn": "19-209-0608 - Soft Computing (April 2026).pdf",
    "u": "../questionpapers/Soft Computing 2026 Apr (2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 6,
    "code": "19-209-0608",
    "title": "Soft computing",
    "yr": "2023",
    "fn": "19-209-0608 - Soft computing (June 2023).pdf",
    "u": "../questionpapers/Soft computing 2023 June  (2019 Ad.)"
  },
  {
    "s": "2019",
    "sem": 6,
    "code": "19-209-0608",
    "title": "Soft computing",
    "yr": "2022",
    "fn": "19-209-0608 - Soft computing (November 2022).pdf",
    "u": "../questionpapers/Soft computing 2022 Nov (2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 7,
    "code": "19-209-0702",
    "title": "HVDC and FACTS",
    "yr": "2026",
    "fn": "19-209-0702 - HVDC and FACTS (April 2026).pdf",
    "u": "../questionpapers/HVDC and FACTS 2026 Apr (2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 7,
    "code": "19-209-0702",
    "title": "HVDC and FACTS",
    "yr": "2023",
    "fn": "19-209-0702 - HVDC and FACTS (March 2023).pdf",
    "u": "../questionpapers/HVDC and FACTS   2023 March (2019 Ad).pdf"
  },
  {
    "s": "2019",
    "sem": 7,
    "code": "19-209-0702",
    "title": "HVDC and FACTS",
    "yr": "2024",
    "fn": "19-209-0702 - HVDC and FACTS (May 2024).pdf",
    "u": "../questionpapers/HVDC and FACTS  2024 May (2019 Ad.).pdf.pdf"
  },
  {
    "s": "2019",
    "sem": 7,
    "code": "19-209-0702",
    "title": "HVDC and FACTS",
    "yr": "2024",
    "fn": "19-209-0702 - HVDC and FACTS (November 2024).pdf",
    "u": "../questionpapers/HVDC and FACTS  2024 Nov  (2019 Ad.)_0001.pdf"
  },
  {
    "s": "2019",
    "sem": 7,
    "code": "19-209-0702",
    "title": "HVDC and FACTS",
    "yr": "2025",
    "fn": "19-209-0702 - HVDC and FACTS (November 2025).pdf",
    "u": "../questionpapers/HVDC and FACTS  2025 Nov  (2019 Ad.)_0001.pdf"
  },
  {
    "s": "2019",
    "sem": 7,
    "code": "19-209-0703",
    "title": "Communication Engineering",
    "yr": "2026",
    "fn": "19-209-0703 - Communication Engineering (April 2026).pdf",
    "u": "../questionpapers/Communication Engineering 2026 Apr (2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 7,
    "code": "19-209-0703",
    "title": "Communication Engineering",
    "yr": "2023",
    "fn": "19-209-0703 - Communication Engineering (March 2023).pdf",
    "u": "../questionpapers/Communication Engineering  2023 March (2019 Ad).pdf"
  },
  {
    "s": "2019",
    "sem": 7,
    "code": "19-209-0703",
    "title": "Communication Engineering",
    "yr": "2025",
    "fn": "19-209-0703 - Communication Engineering (November 2025).pdf",
    "u": "../questionpapers/Communication Engineering  2025 Nov (2019 Ad).pdf"
  },
  {
    "s": "2019",
    "sem": 7,
    "code": "19-209-0704(E)",
    "title": "Electric and Hybrid Vehicles",
    "yr": "2026",
    "fn": "19-209-0704(E) - Electric and Hybrid Vehicles (April 2026).pdf",
    "u": "../questionpapers/Electric and Hybrid Vehicles 2026 Apr (2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 7,
    "code": "19-209-0709",
    "title": "New and Renewable Sources of Energy",
    "yr": "2023",
    "fn": "19-209-0709 - New and Renewable Sources of Energy (March 2023).pdf",
    "u": "../questionpapers/New and Renewable Sources of Energy  2023 March (2019 Ad).pdf"
  },
  {
    "s": "2019",
    "sem": 8,
    "code": "19-209-0801",
    "title": "Electrical System Design",
    "yr": "2023",
    "fn": "19-209-0801 - Electrical System Design (April 2023).pdf",
    "u": "../questionpapers/Electrical System Design 2023 April ( 2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 8,
    "code": "19-209-0801",
    "title": "Electrical System Design",
    "yr": "2023",
    "fn": "19-209-0801 - Electrical System Design (July 2023).pdf",
    "u": "../questionpapers/Electrical System Design 2023 July  ( 2019 Ad.)"
  },
  {
    "s": "2019",
    "sem": 8,
    "code": "19-209-0804",
    "title": "Solar PV Systems",
    "yr": "2023",
    "fn": "19-209-0804 - Solar PV Systems (April 2023).pdf",
    "u": "../questionpapers/Solar PV Systems 2023 April ( 2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 8,
    "code": "19-209-0805",
    "title": "Power Quality",
    "yr": "2023",
    "fn": "19-209-0805 - Power Quality (April 2023).pdf",
    "u": "../questionpapers/Power Quality 2023 April (2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 8,
    "code": "19-209-0806",
    "title": "Utilization of Electrical Power",
    "yr": "2023",
    "fn": "19-209-0806 - Utilization of Electrical Power (April 2023).pdf",
    "u": "../questionpapers/Utilization of Electrical Power 2023 April ( 2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 8,
    "code": "19-209-0806",
    "title": "Utilization of Electrical Power",
    "yr": "2023",
    "fn": "19-209-0806 - Utilization of Electrical Power (July 2023).pdf",
    "u": "../questionpapers/Utilization of Electrical Power 2023 July  ( 2019 Ad.)"
  },
  {
    "s": "2019",
    "sem": 8,
    "code": "19-209-0812",
    "title": "Sustainability Engineering",
    "yr": "2023",
    "fn": "19-209-0812 - Sustainability Engineering (April 2023).pdf",
    "u": "../questionpapers/Sustainability Engineering 2023 April ( 2019 Ad.).pdf"
  },
  {
    "s": "2019",
    "sem": 8,
    "code": "19-209-0812",
    "title": "Sustainability Engineering",
    "yr": "2023",
    "fn": "19-209-0812 - Sustainability Engineering (July 2023).pdf",
    "u": "../questionpapers/Sustainability Engineering 2023 July  ( 2019 Ad.)"
  }
];

  const PAPERS_2015 = [
  {
    "s": "2015",
    "sem": 3,
    "code": "EE-15-1302",
    "title": "Fluid Machinery and Heat Engines",
    "yr": "2017",
    "fn": "EE-15-1302 - Fluid Machinery and Heat Engines (May 2017).pdf",
    "u": "../questionpapers/Fluid Machinery and Heat Engines 2017 May (2015 Ad).PDF"
  },
  {
    "s": "2015",
    "sem": 3,
    "code": "EE-15-1302",
    "title": "Fluid Machinery and Heat Engines",
    "yr": "2020",
    "fn": "EE-15-1302 - Fluid Machinery and Heat Engines (November 2020).pdf",
    "u": "../questionpapers/Fluid Machinery and Heat Engines 2020 Nov (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 3,
    "code": "EE-15-1302",
    "title": "Fluid Mechinery and Heat Engines",
    "yr": "2021",
    "fn": "EE-15-1302 - Fluid Mechinery and Heat Engines (April 2021).pdf",
    "u": "../questionpapers/Fluid Mechinery and Heat Engines 2021 Apr. (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 3,
    "code": "EE-15-1302",
    "title": "Fluid Mechinery and Heat Engines",
    "yr": "2021",
    "fn": "EE-15-1302 - Fluid Mechinery and Heat Engines (November 2021).pdf",
    "u": "../questionpapers/Fluid Mechinery and Heat Engines  2021 Nov (2015 Ad.).pdf"
  },
  {
    "s": "2015",
    "sem": 3,
    "code": "EE-15-1302",
    "title": "Fluid machinery and heat engines (",
    "yr": "2018",
    "fn": "EE-15-1302 - Fluid machinery and heat engines ( (April 1).pdf",
    "u": "../questionpapers/Fluid machinery and heat engines (1) 2018 April (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 3,
    "code": "EE-15-1302",
    "title": "Fluid machinery and heat engines",
    "yr": "2018",
    "fn": "EE-15-1302 - Fluid machinery and heat engines (April 2018).pdf",
    "u": "../questionpapers/Fluid machinery and heat engines 2018 April (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 3,
    "code": "EE-15-1302",
    "title": "Fluid machinery and heat engines",
    "yr": "2016",
    "fn": "EE-15-1302 - Fluid machinery and heat engines (November 2016).pdf",
    "u": "../questionpapers/Fluid machinery and heat engines 2016 Nov (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 3,
    "code": "EE-15-1302",
    "title": "Fluid machinery and heat engines",
    "yr": "2017",
    "fn": "EE-15-1302 - Fluid machinery and heat engines (November 2017).pdf",
    "u": "../questionpapers/Fluid machinery and heat engines 2017 Nov (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 3,
    "code": "EE-15-1303",
    "title": "Circuits and Networks",
    "yr": "2021",
    "fn": "EE-15-1303 - Circuits and Networks (April 2021).pdf",
    "u": "../questionpapers/Circuits and Networks 2021 Apr.(2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 3,
    "code": "EE-15-1303",
    "title": "Circuits and Networks",
    "yr": "2017",
    "fn": "EE-15-1303 - Circuits and Networks (May 2017).pdf",
    "u": "../questionpapers/Circuits and Networks   2017  May (2015 Ad).PDF"
  },
  {
    "s": "2015",
    "sem": 3,
    "code": "EE-15-1303",
    "title": "Circuits and Networks",
    "yr": "2021",
    "fn": "EE-15-1303 - Circuits and Networks (November 2021).pdf",
    "u": "../questionpapers/Circuits and Networks  2021 No  (2015 Ad.).pdf"
  },
  {
    "s": "2015",
    "sem": 3,
    "code": "EE-15-1303",
    "title": "Circuits and networks",
    "yr": "2018",
    "fn": "EE-15-1303 - Circuits and networks (April 2018).pdf",
    "u": "../questionpapers/Circuits and networks 2018 April (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 3,
    "code": "EE-15-1303",
    "title": "Circuits and networks",
    "yr": "2016",
    "fn": "EE-15-1303 - Circuits and networks (November 2016).pdf",
    "u": "../questionpapers/Circuits and networks 2016 Nov (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 3,
    "code": "EE-15-1303",
    "title": "Circuits and networks",
    "yr": "2017",
    "fn": "EE-15-1303 - Circuits and networks (November 2017).pdf",
    "u": "../questionpapers/Circuits and networks 2017 Nov (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 3,
    "code": "EE-15-1303",
    "title": "Circuits and networks",
    "yr": "2020",
    "fn": "EE-15-1303 - Circuits and networks (November 2020).pdf",
    "u": "../questionpapers/Circuits and networks 2020 Nov (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 3,
    "code": "EE-15-1304",
    "title": "Electrical Measurements and Measuring Instruments",
    "yr": "2020",
    "fn": "EE-15-1304 - Electrical Measurements and Measuring Instruments (November 2020).pdf",
    "u": "../questionpapers/Electrical Measurements and Measuring Instruments 2020 Nov (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 3,
    "code": "EE-15-1304",
    "title": "Electrical Measurements and measuring instruments",
    "yr": "2017",
    "fn": "EE-15-1304 - Electrical Measurements and measuring instruments (November 2017).pdf",
    "u": "../questionpapers/Electrical Measurements and measuring instruments 2017 Nov (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 3,
    "code": "EE-15-1304",
    "title": "Electrical measurements and measuring instruments",
    "yr": "2018",
    "fn": "EE-15-1304 - Electrical measurements and measuring instruments (April 2018).pdf",
    "u": "../questionpapers/Electrical measurements and measuring instruments 2018 April (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 3,
    "code": "EE-15-1304",
    "title": "Electrical measurements and measuring instruments",
    "yr": "2016",
    "fn": "EE-15-1304 - Electrical measurements and measuring instruments (November 2016).pdf",
    "u": "../questionpapers/Electrical measurements and measuring instruments 2016 Nov (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 3,
    "code": "EE-15-1305",
    "title": "Electronic Devices and Circuits",
    "yr": "2021",
    "fn": "EE-15-1305 - Electronic Devices and Circuits (April 2021).pdf",
    "u": "../questionpapers/Electronic Devices and Circuits 2021 Apr.(2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 3,
    "code": "EE-15-1305",
    "title": "Electronic Devices and Circuits",
    "yr": "2017",
    "fn": "EE-15-1305 - Electronic Devices and Circuits (May 2017).pdf",
    "u": "../questionpapers/Electronic Devices and Circuits 2017 May (2015 Ad).PDF"
  },
  {
    "s": "2015",
    "sem": 3,
    "code": "EE-15-1305",
    "title": "Electronic Devices and Circuits",
    "yr": "2020",
    "fn": "EE-15-1305 - Electronic Devices and Circuits (November 2020).pdf",
    "u": "../questionpapers/Electronic Devices and Circuits 2020 Nov (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 3,
    "code": "EE-15-1305",
    "title": "Electronic devices and circuits",
    "yr": "2018",
    "fn": "EE-15-1305 - Electronic devices and circuits (April 2018).pdf",
    "u": "../questionpapers/Electronic devices and circuits 2018 April (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 3,
    "code": "EE-15-1305",
    "title": "Electronic devices and circuits",
    "yr": "2016",
    "fn": "EE-15-1305 - Electronic devices and circuits (November 2016).pdf",
    "u": "../questionpapers/Electronic devices and circuits 2016 Nov (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 3,
    "code": "EE-15-1305",
    "title": "Electronic devices and circuits",
    "yr": "2017",
    "fn": "EE-15-1305 - Electronic devices and circuits (November 2017).pdf",
    "u": "../questionpapers/Electronic devices and circuits 2017 Nov (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 3,
    "code": "EE-15-1305",
    "title": "Electronics Devices and Circuits",
    "yr": "2021",
    "fn": "EE-15-1305 - Electronics Devices and Circuits (November 2021).pdf",
    "u": "../questionpapers/Electronics Devices and Circuits  2021 Nov (2015 Ad.).pdf"
  },
  {
    "s": "2015",
    "sem": 3,
    "code": "EE-15-1306",
    "title": "Electrical Machines",
    "yr": "2021",
    "fn": "EE-15-1306 - Electrical Machines (November 2021).pdf",
    "u": "../questionpapers/Electrical Machines  2021 Nov (2015 Ad.).pdf"
  },
  {
    "s": "2015",
    "sem": 3,
    "code": "EE-15-1306",
    "title": "Electrical Machines I",
    "yr": "2017",
    "fn": "EE-15-1306 - Electrical Machines I (May 2017).pdf",
    "u": "../questionpapers/Electrical Machines I 2017 May (2015 Ad).PDF"
  },
  {
    "s": "2015",
    "sem": 3,
    "code": "EE-15-1306",
    "title": "Electrical Machines I",
    "yr": "2020",
    "fn": "EE-15-1306 - Electrical Machines I (November 2020).pdf",
    "u": "../questionpapers/Electrical Machines I 2020 Nov (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 3,
    "code": "EE-15-1306",
    "title": "Electrical Mechines I",
    "yr": "2021",
    "fn": "EE-15-1306 - Electrical Mechines I (April 2021).pdf",
    "u": "../questionpapers/Electrical Mechines I 2021 Apr.(2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 3,
    "code": "EE-15-1306",
    "title": "Electrical machines I",
    "yr": "2018",
    "fn": "EE-15-1306 - Electrical machines I (April 2018).pdf",
    "u": "../questionpapers/Electrical machines I 2018 April (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 3,
    "code": "EE-15-1306",
    "title": "Electrical machines I",
    "yr": "2016",
    "fn": "EE-15-1306 - Electrical machines I (November 2016).pdf",
    "u": "../questionpapers/Electrical machines I 2016 Nov (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 3,
    "code": "EE-15-1306",
    "title": "Electrical machines I",
    "yr": "2017",
    "fn": "EE-15-1306 - Electrical machines I (November 2017).pdf",
    "u": "../questionpapers/Electrical machines I 2017 Nov (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 4,
    "code": "EE-15-1402",
    "title": "Circuits Signals and Systems",
    "yr": "2017",
    "fn": "EE-15-1402 - Circuits Signals and Systems (April 2017).pdf",
    "u": "../questionpapers/Circuits Signals and Systems 2017  April (2015 Ad).PDF"
  },
  {
    "s": "2015",
    "sem": 4,
    "code": "EE-15-1402",
    "title": "Circuits Signals and Systems",
    "yr": "2019",
    "fn": "EE-15-1402 - Circuits Signals and Systems (April 2019) [2].pdf",
    "u": "../questionpapers/Circuits Signals and Systems 2019  April (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 4,
    "code": "EE-15-1402",
    "title": "Circuits Signals and Systems",
    "yr": "2019",
    "fn": "EE-15-1402 - Circuits Signals and Systems (April 2019).pdf",
    "u": "../questionpapers/Circuits Signals and Systems 2019  April (2015 Scheme).pdf"
  },
  {
    "s": "2015",
    "sem": 4,
    "code": "EE-15-1402",
    "title": "Circuits, Signals and Systems",
    "yr": "2021",
    "fn": "EE-15-1402 - Circuits Signals and Systems (April 2021).pdf",
    "u": "../questionpapers/Circuits, Signals and Systems 2021 April (2015 Scheme).pdf"
  },
  {
    "s": "2015",
    "sem": 4,
    "code": "EE-15-1402",
    "title": "Circuits, Signals and Systems",
    "yr": "2022",
    "fn": "EE-15-1402 - Circuits Signals and Systems (April 2022).pdf",
    "u": "../questionpapers/Circuits, Signals and Systems 2022 April (2015 Ad.).pdf"
  },
  {
    "s": "2015",
    "sem": 4,
    "code": "EE-15-1402",
    "title": "Circuits Signals and Systems",
    "yr": "2020",
    "fn": "EE-15-1402 - Circuits Signals and Systems (February 2020) [2].pdf",
    "u": "../questionpapers/Circuits Signals and Systems 2020 Feb  (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 4,
    "code": "EE-15-1402",
    "title": "Circuits, signals and systems",
    "yr": "2020",
    "fn": "EE-15-1402 - Circuits signals and systems (February 2020).pdf",
    "u": "../questionpapers/Circuits, signals and systems 2020 Feb (2015 scheme).pdf.pdf"
  },
  {
    "s": "2015",
    "sem": 4,
    "code": "EE-15-1403",
    "title": "Electrical Machines II",
    "yr": "2017",
    "fn": "EE-15-1403 - Electrical Machines II (April 2017).pdf",
    "u": "../questionpapers/Electrical Machines II 2017  April (2015 Ad).PDF"
  },
  {
    "s": "2015",
    "sem": 4,
    "code": "EE-15-1403",
    "title": "Electrical Machines II",
    "yr": "2019",
    "fn": "EE-15-1403 - Electrical Machines II (April 2019) [2].pdf",
    "u": "../questionpapers/Electrical Machines II 2019  April (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 4,
    "code": "EE-15-1403",
    "title": "Electrical Machines II",
    "yr": "2019",
    "fn": "EE-15-1403 - Electrical Machines II (April 2019).pdf",
    "u": "../questionpapers/Electrical Machines II 2019 April (2015).pdf"
  },
  {
    "s": "2015",
    "sem": 4,
    "code": "EE-15-1403",
    "title": "Electrical Machines II",
    "yr": "2020",
    "fn": "EE-15-1403 - Electrical Machines II (February 2020) [2].pdf",
    "u": "../questionpapers/Electrical Machines II 2020 Feb  (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 4,
    "code": "EE-15-1403",
    "title": "Electrical machines II",
    "yr": "2020",
    "fn": "EE-15-1403 - Electrical machines II (February 2020).pdf",
    "u": "../questionpapers/Electrical machines II 2020 Feb (2015 scheme).pdf.pdf"
  },
  {
    "s": "2015",
    "sem": 4,
    "code": "EE-15-1404",
    "title": "Electrical Engineering Materials",
    "yr": "2017",
    "fn": "EE-15-1404 - Electrical Engineering Materials (April 2017).pdf",
    "u": "../questionpapers/Electrical Engineering Materials 2017  April (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 4,
    "code": "EE-15-1404",
    "title": "Electrical Engineering Materials",
    "yr": "2019",
    "fn": "EE-15-1404 - Electrical Engineering Materials (April 2019) [2].pdf",
    "u": "../questionpapers/Electrical Engineering Materials 2019  April (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 4,
    "code": "EE-15-1404",
    "title": "Electrical Engineering Materials",
    "yr": "2019",
    "fn": "EE-15-1404 - Electrical Engineering Materials (April 2019).pdf",
    "u": "../questionpapers/Electrical Engineering Materials 2019 April (2015).pdf"
  },
  {
    "s": "2015",
    "sem": 4,
    "code": "EE-15-1404",
    "title": "Electrical Engineering Materials",
    "yr": "2020",
    "fn": "EE-15-1404 - Electrical Engineering Materials (April 2020).pdf",
    "u": "../questionpapers/Electrical Engineering Materials 2020  April (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 4,
    "code": "EE-15-1404",
    "title": "Electrical Engineering Materials April",
    "yr": "2017",
    "fn": "EE-15-1404 - Electrical Engineering Materials April (April 2017).pdf",
    "u": "../questionpapers/Electrical Engineering Materials April 2017 Semester IV_36.pdf"
  },
  {
    "s": "2015",
    "sem": 4,
    "code": "EE-15-1404",
    "title": "Electrical engineering materials",
    "yr": "2020",
    "fn": "EE-15-1404 - Electrical engineering materials (February 2020).pdf",
    "u": "../questionpapers/Electrical engineering materials 2020 Feb (2015 scheme).pdf.pdf"
  },
  {
    "s": "2015",
    "sem": 4,
    "code": "EE-15-1405",
    "title": "Digital Electronics",
    "yr": "2017",
    "fn": "EE-15-1405 - Digital Electronics (April 2017).pdf",
    "u": "../questionpapers/Digital Electronics 2017  April (2015 Ad).PDF"
  },
  {
    "s": "2015",
    "sem": 4,
    "code": "EE-15-1405",
    "title": "Digital Electronics",
    "yr": "2018",
    "fn": "EE-15-1405 - Digital Electronics (April 2018) [2].pdf",
    "u": "../questionpapers/Digital Electronics 2018  April (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 4,
    "code": "EE-15-1405",
    "title": "Digital Electronics",
    "yr": "2018",
    "fn": "EE-15-1405 - Digital Electronics (April 2018).pdf",
    "u": "../questionpapers/Digital Electronics 2018 April (2015).pdf"
  },
  {
    "s": "2015",
    "sem": 4,
    "code": "EE-15-1405",
    "title": "Digital Electronics",
    "yr": "2019",
    "fn": "EE-15-1405 - Digital Electronics (April 2019) [2].pdf",
    "u": "../questionpapers/Digital Electronics 2019  April (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 4,
    "code": "EE-15-1405",
    "title": "Digital Electronics",
    "yr": "2019",
    "fn": "EE-15-1405 - Digital Electronics (April 2019).pdf",
    "u": "../questionpapers/Digital Electronics 2019  April (2015).pdf"
  },
  {
    "s": "2015",
    "sem": 4,
    "code": "EE-15-1405",
    "title": "Digital Electronics",
    "yr": "2022",
    "fn": "EE-15-1405 - Digital Electronics (April 2022).pdf",
    "u": "../questionpapers/Digital Electronics 2022 April (2015 Ad.).pdf"
  },
  {
    "s": "2015",
    "sem": 4,
    "code": "EE-15-1405",
    "title": "Digital Electronics",
    "yr": "2020",
    "fn": "EE-15-1405 - Digital Electronics (February 2020) [2].pdf",
    "u": "../questionpapers/Digital Electronics 2020 Feb  (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 4,
    "code": "EE-15-1405",
    "title": "Digital electronics",
    "yr": "2020",
    "fn": "EE-15-1405 - Digital electronics (February 2020).pdf",
    "u": "../questionpapers/Digital electronics 2020 Feb (2015 scheme).pdf.pdf"
  },
  {
    "s": "2015",
    "sem": 4,
    "code": "EE-15-1406",
    "title": "Power Electronics",
    "yr": "2017",
    "fn": "EE-15-1406 - Power Electronics (April 2017).pdf",
    "u": "../questionpapers/Power Electronics 2017  April (2015 Ad).PDF"
  },
  {
    "s": "2015",
    "sem": 4,
    "code": "EE-15-1406",
    "title": "Power Electronics",
    "yr": "2022",
    "fn": "EE-15-1406 - Power Electronics (April 2022).pdf",
    "u": "../questionpapers/Power Electronics 2022 April (2015 Ad.).pdf"
  },
  {
    "s": "2015",
    "sem": 4,
    "code": "EE-15-1406",
    "title": "Power Electronics",
    "yr": "2020",
    "fn": "EE-15-1406 - Power Electronics (February 2020).pdf",
    "u": "../questionpapers/Power Electronics 2020 Feb  (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 5,
    "code": "EE-15-1502",
    "title": "Linear Integrated Circuits",
    "yr": "2019",
    "fn": "EE-15-1502 - Linear Integrated Circuits (April 2019).pdf",
    "u": "../questionpapers/Linear Integrated Circuits 2019 April  (2015 Scheme).pdf"
  },
  {
    "s": "2015",
    "sem": 5,
    "code": "EE-15-1502",
    "title": "Linear Integrated Circuits",
    "yr": "2021",
    "fn": "EE-15-1502 - Linear Integrated Circuits (April 2021).pdf",
    "u": "../questionpapers/Linear Integrated Circuits  2021 April Nov (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 5,
    "code": "EE-15-1502",
    "title": "Linear Integrated Circuits",
    "yr": "2022",
    "fn": "EE-15-1502 - Linear Integrated Circuits (April 2022).pdf",
    "u": "../questionpapers/Linear Integrated Circuits  2022 April Nov (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 5,
    "code": "EE-15-1502",
    "title": "Linear Integrated Circuits",
    "yr": "2018",
    "fn": "EE-15-1502 - Linear Integrated Circuits (November 2018).pdf",
    "u": "../questionpapers/Linear Integrated Circuits 2018 Nov (2015 Scheme).pdf"
  },
  {
    "s": "2015",
    "sem": 5,
    "code": "EE-15-1502",
    "title": "Linear Integrated Circuits",
    "yr": "2020",
    "fn": "EE-15-1502 - Linear Integrated Circuits (November 2020).pdf",
    "u": "../questionpapers/Linear Integrated Circuits  2020 Nov (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 5,
    "code": "EE-15-1502",
    "title": "Linear Integrated Circuits",
    "yr": "2021",
    "fn": "EE-15-1502 - Linear Integrated Circuits (November 2021).pdf",
    "u": "../questionpapers/Linear Integrated Circuits  2021 Nov (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 5,
    "code": "EE-15-1502",
    "title": "Linear Integrated Circuits",
    "yr": "2022",
    "fn": "EE-15-1502 - Linear Integrated Circuits (November 2022).pdf",
    "u": "../questionpapers/Linear Integrated Circuits  2022 Nov (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 5,
    "code": "EE-15-1503",
    "title": "Field Theory",
    "yr": "2019",
    "fn": "EE-15-1503 - Field Theory (April 2019).pdf",
    "u": "../questionpapers/Field Theory 2019 April (2015).pdf"
  },
  {
    "s": "2015",
    "sem": 5,
    "code": "EE-15-1503",
    "title": "Field Theory",
    "yr": "2021",
    "fn": "EE-15-1503 - Field Theory (April 2021).pdf",
    "u": "../questionpapers/Field Theory 2021 April (2015).pdf"
  },
  {
    "s": "2015",
    "sem": 5,
    "code": "EE-15-1503",
    "title": "Field Theory",
    "yr": "2022",
    "fn": "EE-15-1503 - Field Theory (April 2022).pdf",
    "u": "../questionpapers/Field Theory  2022 April  (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 5,
    "code": "EE-15-1503",
    "title": "Field Theory",
    "yr": "2018",
    "fn": "EE-15-1503 - Field Theory (November 2018).pdf",
    "u": "../questionpapers/Field Theory 2018 Nov  (2015).pdf"
  },
  {
    "s": "2015",
    "sem": 5,
    "code": "EE-15-1503",
    "title": "Field Theory",
    "yr": "2020",
    "fn": "EE-15-1503 - Field Theory (November 2020).pdf",
    "u": "../questionpapers/Field Theory  2020 Nov (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 5,
    "code": "EE-15-1503",
    "title": "Field Theory",
    "yr": "2021",
    "fn": "EE-15-1503 - Field Theory (November 2021).pdf",
    "u": "../questionpapers/Field Theory  2021 Nov (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 5,
    "code": "EE-15-1503",
    "title": "Field Theory",
    "yr": "2022",
    "fn": "EE-15-1503 - Field Theory (November 2022).pdf",
    "u": "../questionpapers/Field Theory  2022 Nov (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 5,
    "code": "EE-15-1504",
    "title": "Microprocessor and Microcontrolled Based Systems",
    "yr": "2018",
    "fn": "EE-15-1504 - Microprocessor and Microcontrolled Based Systems (April 2018).pdf",
    "u": "../questionpapers/Microprocessor and Microcontrolled Based Systems 2018 April (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 5,
    "code": "EE-15-1504",
    "title": "Microprocessor and Microcontrolled Based Systems",
    "yr": "2019",
    "fn": "EE-15-1504 - Microprocessor and Microcontrolled Based Systems (April 2019).pdf",
    "u": "../questionpapers/Microprocessor and Microcontrolled Based Systems 2019 April (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 5,
    "code": "EE-15-1504",
    "title": "Microprocessor and Microcontrolled Based Systems",
    "yr": "2021",
    "fn": "EE-15-1504 - Microprocessor and Microcontrolled Based Systems (April 2021).pdf",
    "u": "../questionpapers/Microprocessor and Microcontrolled Based Systems 2021 April (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 5,
    "code": "EE-15-1504",
    "title": "Microprocessor and Microcontrolled Based Systems",
    "yr": "2022",
    "fn": "EE-15-1504 - Microprocessor and Microcontrolled Based Systems (April 2022).pdf",
    "u": "../questionpapers/Microprocessor and Microcontrolled Based Systems 2022 April (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 5,
    "code": "EE-15-1504",
    "title": "Microprocessor and Microcontrolled Based Systems",
    "yr": "2020",
    "fn": "EE-15-1504 - Microprocessor and Microcontrolled Based Systems (November 2020).pdf",
    "u": "../questionpapers/Microprocessor and Microcontrolled Based Systems 2020 Nov (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 5,
    "code": "EE-15-1504",
    "title": "Microprocessor and Microcontrolled Based Systems",
    "yr": "2022",
    "fn": "EE-15-1504 - Microprocessor and Microcontrolled Based Systems (November 2022).pdf",
    "u": "../questionpapers/Microprocessor and Microcontrolled Based Systems 2022 Nov (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 5,
    "code": "EE-15-1504",
    "title": "Numerical and statastical Method",
    "yr": "2021",
    "fn": "EE-15-1504 - Numerical and statastical Method (April 2021).pdf",
    "u": "../questionpapers/Numerical and statastical Method 2021 April (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 5,
    "code": "EE-15-1505",
    "title": "Electrical Drawing",
    "yr": "2019",
    "fn": "EE-15-1505 - Electrical Drawing (April 2019).pdf",
    "u": "../questionpapers/Electrical Drawing  2019 April (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 5,
    "code": "EE-15-1505",
    "title": "Electrical Drawing",
    "yr": "2021",
    "fn": "EE-15-1505 - Electrical Drawing (April 2021).pdf",
    "u": "../questionpapers/Electrical Drawing  2021  April (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 5,
    "code": "EE-15-1505",
    "title": "Electrical Drawing",
    "yr": "2018",
    "fn": "EE-15-1505 - Electrical Drawing (November 2018).pdf",
    "u": "../questionpapers/Electrical Drawing  2018 Nov (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 5,
    "code": "EE-15-1505",
    "title": "Electrical Drawing",
    "yr": "2020",
    "fn": "EE-15-1505 - Electrical Drawing (November 2020).pdf",
    "u": "../questionpapers/Electrical Drawing  2020 Nov (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 5,
    "code": "EE-15-1505",
    "title": "Electrical Drawing",
    "yr": "2021",
    "fn": "EE-15-1505 - Electrical Drawing (November 2021).pdf",
    "u": "../questionpapers/Electrical Drawing  2021 Nov (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 5,
    "code": "EE-15-1505",
    "title": "Electrical Drawing",
    "yr": "2022",
    "fn": "EE-15-1505 - Electrical Drawing (November 2022).pdf",
    "u": "../questionpapers/Electrical Drawing  2022 Nov (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 5,
    "code": "EE-15-1506",
    "title": "Power Systems I",
    "yr": "2021",
    "fn": "EE-15-1506 - Power Systems I (April 2021).pdf",
    "u": "../questionpapers/Power Systems I 2021 April  (2015 Scheme).pdf"
  },
  {
    "s": "2015",
    "sem": 5,
    "code": "EE-15-1506",
    "title": "Power Systems I",
    "yr": "2018",
    "fn": "EE-15-1506 - Power Systems I (November 2018).pdf",
    "u": "../questionpapers/Power Systems I 2018 Nov (2015 Scheme).pdf"
  },
  {
    "s": "2015",
    "sem": 5,
    "code": "EE-15-1506",
    "title": "Power Systems I",
    "yr": "2020",
    "fn": "EE-15-1506 - Power Systems I (November 2020).pdf",
    "u": "../questionpapers/Power Systems I 2020 Nov (2015 Scheme).pdf"
  },
  {
    "s": "2015",
    "sem": 5,
    "code": "EE-15-1506",
    "title": "Power Systems I",
    "yr": "2021",
    "fn": "EE-15-1506 - Power Systems I (November 2021).pdf",
    "u": "../questionpapers/Power Systems I 2021 Nov (2015 Scheme).pdf"
  },
  {
    "s": "2015",
    "sem": 5,
    "code": "EE-15-1506",
    "title": "Power Systems I",
    "yr": "2022",
    "fn": "EE-15-1506 - Power Systems I (November 2022).pdf",
    "u": "../questionpapers/Power Systems I 2022  Nov (2015 Scheme).pdf"
  },
  {
    "s": "2015",
    "sem": 6,
    "code": "EE-15-1601",
    "title": "Electronic Communication",
    "yr": "2018",
    "fn": "EE-15-1601 - Electronic Communication (April 2018).pdf",
    "u": "../questionpapers/Electronic Communication   2018  April  (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 6,
    "code": "EE-15-1601",
    "title": "Electronic Communication",
    "yr": "2019",
    "fn": "EE-15-1601 - Electronic Communication (April 2019).pdf",
    "u": "../questionpapers/Electronic Communication   2019 April   (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 6,
    "code": "EE-15-1601",
    "title": "Electronic Communication",
    "yr": "2019",
    "fn": "EE-15-1601 - Electronic Communication (January 2019).pdf",
    "u": "../questionpapers/Electronic Communication   2019 Jan  (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 6,
    "code": "EE-15-1602",
    "title": "Digital Signal Processing",
    "yr": "2018",
    "fn": "EE-15-1602 - Digital Signal Processing (April 2018).pdf",
    "u": "../questionpapers/Digital Signal Processing   2018 April  (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 6,
    "code": "EE-15-1602",
    "title": "Digital Signal Processing",
    "yr": "2022",
    "fn": "EE-15-1602 - Digital Signal Processing (April 2022).pdf",
    "u": "../questionpapers/Digital Signal Processing 2022 April (2015 Ad. )"
  },
  {
    "s": "2015",
    "sem": 6,
    "code": "EE-15-1602",
    "title": "Digital Signal Processing",
    "yr": "2019",
    "fn": "EE-15-1602 - Digital Signal Processing (January 2019) [2].pdf",
    "u": "../questionpapers/Digital Signal Processing   2019 January  (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 6,
    "code": "EE-15-1602",
    "title": "Digital Signal Processing",
    "yr": "2019",
    "fn": "EE-15-1602 - Digital Signal Processing (January 2019).pdf",
    "u": "../questionpapers/Digital Signal Processing 2019 Jan (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 6,
    "code": "EE-15-1603",
    "title": "Power Systems II",
    "yr": "2018",
    "fn": "EE-15-1603 - Power Systems II (April 2018).pdf",
    "u": "../questionpapers/Power Systems II  2018 April  (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 6,
    "code": "EE-15-1603",
    "title": "Power Systems II",
    "yr": "2019",
    "fn": "EE-15-1603 - Power Systems II (January 2019).pdf",
    "u": "../questionpapers/Power Systems II  2019 January (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 6,
    "code": "EE-15-1604",
    "title": "Electric Drives",
    "yr": "2018",
    "fn": "EE-15-1604 - Electric Drives (April 2018).pdf",
    "u": "../questionpapers/Electric Drives   2018  April  (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 6,
    "code": "EE-15-1604",
    "title": "Electric Drives",
    "yr": "2019",
    "fn": "EE-15-1604 - Electric Drives (January 2019).pdf",
    "u": "../questionpapers/Electric Drives   2019 Jan  (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 6,
    "code": "EE-15-1605",
    "title": "Control Systems I",
    "yr": "2018",
    "fn": "EE-15-1605 - Control Systems I (April 2018).pdf",
    "u": "../questionpapers/Control Systems I   2018  April  (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 6,
    "code": "EE-15-1605",
    "title": "Control Systems I",
    "yr": "2019",
    "fn": "EE-15-1605 - Control Systems I (January 2019).pdf",
    "u": "../questionpapers/Control Systems I   2019  Janu  (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 6,
    "code": "EE-15-1606",
    "title": "Advanced Power Electronics",
    "yr": "2018",
    "fn": "EE-15-1606 - Advanced Power Electronics (April 2018).pdf",
    "u": "../questionpapers/Advanced Power Electronics   2018  April (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 6,
    "code": "EE-15-1606",
    "title": "Advanced Power Electronics",
    "yr": "2022",
    "fn": "EE-15-1606 - Advanced Power Electronics (April 2022).pdf",
    "u": "../questionpapers/Advanced Power Electronics 2022 April (2015 Ad.)"
  },
  {
    "s": "2015",
    "sem": 6,
    "code": "EE-15-1606",
    "title": "Advanced Power Electronics",
    "yr": "2019",
    "fn": "EE-15-1606 - Advanced Power Electronics (January 2019).pdf",
    "u": "../questionpapers/Advanced Power Electronics  2019 Jan (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 7,
    "code": "EE-15-1702",
    "title": "Electrical System Design",
    "yr": "2020",
    "fn": "EE-15-1702 - Electrical System Design (November 2020).pdf",
    "u": "../questionpapers/Electrical System Design 2020 Nov (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 7,
    "code": "EE-15-1702",
    "title": "Electrical system Design",
    "yr": "2019",
    "fn": "EE-15-1702 - Electrical system Design (April 2019).pdf",
    "u": "../questionpapers/Electrical system Design 2019 April (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 7,
    "code": "EE-15-1702",
    "title": "Electrical system Design",
    "yr": "2021",
    "fn": "EE-15-1702 - Electrical system Design (April 2021).pdf",
    "u": "../questionpapers/Electrical system Design 2021 April (2015 Ad)"
  },
  {
    "s": "2015",
    "sem": 7,
    "code": "EE-15-1702",
    "title": "Electrical system Design",
    "yr": "2018",
    "fn": "EE-15-1702 - Electrical system Design (November 2018).pdf",
    "u": "../questionpapers/Electrical system Design 2018 Nov (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 7,
    "code": "EE-15-1702",
    "title": "Electrical system Design",
    "yr": "2019",
    "fn": "EE-15-1702 - Electrical system Design (November 2019).pdf",
    "u": "../questionpapers/Electrical system Design 2019 Nov (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 7,
    "code": "EE-15-1702",
    "title": "Electrical system design",
    "yr": "2022",
    "fn": "EE-15-1702 - Electrical system design (April 2022).pdf",
    "u": "../questionpapers/Electrical system design 2022 April (2015 Ad.).pdf"
  },
  {
    "s": "2015",
    "sem": 7,
    "code": "EE-15-1703",
    "title": "New and Renewable Sources Of Energy",
    "yr": "2021",
    "fn": "EE-15-1703 - New and Renewable Sources Of Energy (November 2021).pdf",
    "u": "../questionpapers/New and Renewable Sources Of Energy 2021 November (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 7,
    "code": "EE-15-1703",
    "title": "New and Renewable Sources of Energy",
    "yr": "2021",
    "fn": "EE-15-1703 - New and Renewable Sources of Energy (April 2021).pdf",
    "u": "../questionpapers/New and Renewable Sources of Energy 2021 April (2015 Ad)"
  },
  {
    "s": "2015",
    "sem": 7,
    "code": "EE-15-1703",
    "title": "New and Renewable Sources of Energy",
    "yr": "2020",
    "fn": "EE-15-1703 - New and Renewable Sources of Energy (November 2020).pdf",
    "u": "../questionpapers/New and Renewable Sources of Energy 2020 Nov (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 7,
    "code": "EE-15-1703",
    "title": "New and Renewable Sources of energy",
    "yr": "2019",
    "fn": "EE-15-1703 - New and Renewable Sources of energy (April 2019).pdf",
    "u": "../questionpapers/New and Renewable Sources of energy 2019 April  (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 7,
    "code": "EE-15-1703",
    "title": "New and Renewable Sources of energy",
    "yr": "2018",
    "fn": "EE-15-1703 - New and Renewable Sources of energy (November 2018).pdf",
    "u": "../questionpapers/New and Renewable Sources of energy 2018 Nov (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 7,
    "code": "EE-15-1703",
    "title": "New and Renewable Sources of energy",
    "yr": "2019",
    "fn": "EE-15-1703 - New and Renewable Sources of energy (November 2019).pdf",
    "u": "../questionpapers/New and Renewable Sources of energy 2019 Nov (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 7,
    "code": "EE-15-1703",
    "title": "New and renewable sources of energy",
    "yr": "2022",
    "fn": "EE-15-1703 - New and renewable sources of energy (April 2022).pdf",
    "u": "../questionpapers/New and renewable sources of energy 2022 April (2015 Ad.).pdf"
  },
  {
    "s": "2015",
    "sem": 7,
    "code": "EE-15-1704",
    "title": "Control Systems II",
    "yr": "2019",
    "fn": "EE-15-1704 - Control Systems II (April 2019).pdf",
    "u": "../questionpapers/Control Systems II 2019 April (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 7,
    "code": "EE-15-1704",
    "title": "Control Systems II",
    "yr": "2021",
    "fn": "EE-15-1704 - Control Systems II (April 2021).pdf",
    "u": "../questionpapers/Control Systems II 2021 April (2015 Ad)"
  },
  {
    "s": "2015",
    "sem": 7,
    "code": "EE-15-1704",
    "title": "Control Systems II",
    "yr": "2018",
    "fn": "EE-15-1704 - Control Systems II (November 2018).pdf",
    "u": "../questionpapers/Control Systems II 2018 Nov (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 7,
    "code": "EE-15-1704",
    "title": "Control Systems II",
    "yr": "2019",
    "fn": "EE-15-1704 - Control Systems II (November 2019).pdf",
    "u": "../questionpapers/Control Systems II 2019 Nov (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 7,
    "code": "EE-15-1704",
    "title": "Control Systems II",
    "yr": "2020",
    "fn": "EE-15-1704 - Control Systems II (November 2020).pdf",
    "u": "../questionpapers/Control Systems II 2020 Nov (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 7,
    "code": "EE-15-1704",
    "title": "Control systems II",
    "yr": "2022",
    "fn": "EE-15-1704 - Control systems II (April 2022).pdf",
    "u": "../questionpapers/Control systems II 2022 April (2015 Ad.).pdf"
  },
  {
    "s": "2015",
    "sem": 7,
    "code": "EE-15-1705",
    "title": "Electrical Machine Design",
    "yr": "2019",
    "fn": "EE-15-1705 - Electrical Machine Design (April 2019).pdf",
    "u": "../questionpapers/Electrical Machine Design 2019 April (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 7,
    "code": "EE-15-1705",
    "title": "Electrical Machine Design",
    "yr": "2021",
    "fn": "EE-15-1705 - Electrical Machine Design (April 2021).pdf",
    "u": "../questionpapers/Electrical Machine Design 2021 April (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 7,
    "code": "EE-15-1705",
    "title": "Electrical Machine Design",
    "yr": "2019",
    "fn": "EE-15-1705 - Electrical Machine Design (November 2019).pdf",
    "u": "../questionpapers/Electrical Machine Design 2019 Nov (2015 ad).pdf"
  },
  {
    "s": "2015",
    "sem": 7,
    "code": "EE-15-1705",
    "title": "Electrical Machine Design",
    "yr": "2020",
    "fn": "EE-15-1705 - Electrical Machine Design (November 2020).pdf",
    "u": "../questionpapers/Electrical Machine Design 2020 Nov (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 7,
    "code": "EE-15-1705",
    "title": "Energy Auditing and Analysis",
    "yr": "2019",
    "fn": "EE-15-1705 - Energy Auditing and Analysis (April 2019).pdf",
    "u": "../questionpapers/Energy Auditing and Analysis 2019 April (2015 ad).pdf"
  },
  {
    "s": "2015",
    "sem": 7,
    "code": "EE-15-1705",
    "title": "Energy Auditing and Analysis",
    "yr": "2018",
    "fn": "EE-15-1705 - Energy Auditing and Analysis (November 2018).pdf",
    "u": "../questionpapers/Energy Auditing and Analysis 2018 Nov (2015 ad).pdf"
  },
  {
    "s": "2015",
    "sem": 7,
    "code": "EE-15-1705",
    "title": "Energy Auditing and Analysis",
    "yr": "2019",
    "fn": "EE-15-1705 - Energy Auditing and Analysis (November 2019).pdf",
    "u": "../questionpapers/Energy Auditing and Analysis 2019 Nov (2015 ad).pdf"
  },
  {
    "s": "2015",
    "sem": 7,
    "code": "EE-15-1705",
    "title": "Energy Auditing and Analysis",
    "yr": "2020",
    "fn": "EE-15-1705 - Energy Auditing and Analysis (November 2020).pdf",
    "u": "../questionpapers/Energy Auditing and Analysis 2020 Nov (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 7,
    "code": "EE-15-1705",
    "title": "Industrial Automation",
    "yr": "2021",
    "fn": "EE-15-1705 - Industrial Automation (April 2021) [2].pdf",
    "u": "../questionpapers/Industrial Automation 2021 April (2015 Ad)"
  },
  {
    "s": "2015",
    "sem": 7,
    "code": "EE-15-1705",
    "title": "Industrial Automation",
    "yr": "2021",
    "fn": "EE-15-1705 - Industrial Automation (April 2021).pdf",
    "u": "../questionpapers/Industrial Automation 2021 April (2015 Ad.)pdf"
  },
  {
    "s": "2015",
    "sem": 7,
    "code": "EE-15-1705",
    "title": "Industrial Automation",
    "yr": "2020",
    "fn": "EE-15-1705 - Industrial Automation (November 2020).pdf",
    "u": "../questionpapers/Industrial Automation 2020 Nov (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 7,
    "code": "EE-15-1705",
    "title": "Industrial automation",
    "yr": "2022",
    "fn": "EE-15-1705 - Industrial automation (April 2022).pdf",
    "u": "../questionpapers/Industrial automation 2022 April (2015 Ad.).pdf"
  },
  {
    "s": "2015",
    "sem": 8,
    "code": "EE-15-1801",
    "title": "Electronic Instrumentation",
    "yr": "2022",
    "fn": "EE-15-1801 - Electronic Instrumentation (August 2022).pdf",
    "u": "../questionpapers/Electronic Instrumentation 2022 August (2015 Ad.).pdf"
  },
  {
    "s": "2015",
    "sem": 8,
    "code": "EE-15-1801",
    "title": "Electronic Instrumentation",
    "yr": "2019",
    "fn": "EE-15-1801 - Electronic Instrumentation (July 2019).pdf",
    "u": "../questionpapers/Electronic Instrumentation 2019 Jul (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 8,
    "code": "EE-15-1802",
    "title": "Utilization of Electric Power",
    "yr": "2019",
    "fn": "EE-15-1802 - Utilization of Electric Power (July 2019).pdf",
    "u": "../questionpapers/Utilization of Electric Power  2019 Jul (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 8,
    "code": "EE-15-1802",
    "title": "Utilization of Electrical Power",
    "yr": "2022",
    "fn": "EE-15-1802 - Utilization of Electrical Power (April 2022).pdf",
    "u": "../questionpapers/Utilization of Electrical Power 2022 April (2015 Ad.).pdf"
  },
  {
    "s": "2015",
    "sem": 8,
    "code": "EE-15-1802",
    "title": "Utilization of Electrical Power",
    "yr": "2022",
    "fn": "EE-15-1802 - Utilization of Electrical Power (August 2022).pdf",
    "u": "../questionpapers/Utilization of Electrical Power 2022 August (2015 Ad.).pdf"
  },
  {
    "s": "2015",
    "sem": 8,
    "code": "EE-15-1803",
    "title": "Power Systems III",
    "yr": "2022",
    "fn": "EE-15-1803 - Power Systems III (August 2022).pdf",
    "u": "../questionpapers/Power Systems III 2022 August (2015 Ad.).pdf"
  },
  {
    "s": "2015",
    "sem": 8,
    "code": "EE-15-1803",
    "title": "Power Systems III",
    "yr": "2019",
    "fn": "EE-15-1803 - Power Systems III (July 2019).pdf",
    "u": "../questionpapers/Power Systems III  2019 Jul (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 8,
    "code": "EE-15-1804",
    "title": "Power Quality",
    "yr": "2019",
    "fn": "EE-15-1804 - Power Quality (April 2019).pdf",
    "u": "../questionpapers/Power Quality 2019 April (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 8,
    "code": "EE-15-1804",
    "title": "Power Quality",
    "yr": "2019",
    "fn": "EE-15-1804 - Power Quality (July 2019).pdf",
    "u": "../questionpapers/Power Quality  2019 Jul (2015 Ad).pdf"
  },
  {
    "s": "2015",
    "sem": 8,
    "code": "EE-15-1804",
    "title": "Smart Grid",
    "yr": "2022",
    "fn": "EE-15-1804 - Smart Grid (August 2022).pdf",
    "u": "../questionpapers/Smart Grid 2022 August (2015 Ad.).pdf"
  }
];

  const targetPapers = INCLUDE_2015_SCHEME
    ? PAPERS_2025_2023_2019.concat(PAPERS_2015)
    : PAPERS_2025_2023_2019;

  // Create a floating visual progress banner on the page
  const banner = document.createElement("div");
  banner.style.cssText =
    "position:fixed;top:16px;left:50%;transform:translateX(-50%);z-index:999999;" +
    "background:#0f172a;color:#f8fafc;padding:18px 28px;border-radius:12px;" +
    "box-shadow:0 12px 32px rgba(0,0,0,0.35);font-family:system-ui,sans-serif;" +
    "min-width:420px;max-width:90vw;text-align:center;border:2px solid #38bdf8;";
  banner.innerHTML = `
    <div style="font-size:16px;font-weight:700;margin-bottom:8px;color:#38bdf8;">
      CUSAT EEE Question Papers Auto-Downloader (2025 &rarr; 2023 &rarr; 2019 &rarr; 2015)
    </div>
    <div id="cusat-dl-status" style="font-size:13px;margin-bottom:10px;color:#e2e8f0;">
      Preparing to download ${targetPapers.length} real PDFs...
    </div>
    <div style="background:#334155;height:10px;border-radius:999px;overflow:hidden;">
      <div id="cusat-dl-bar" style="background:#38bdf8;height:100%;width:0%;transition:width 0.2s;"></div>
    </div>
  `;
  document.body.appendChild(banner);

  const statusEl = document.getElementById("cusat-dl-status");
  const barEl = document.getElementById("cusat-dl-bar");

  // Pure Vanilla-JS Standard ZIP Builder (Zero external dependencies, Store mode)
  const crcTable = (() => {
    const t = new Uint32Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      t[i] = c >>> 0;
    }
    return t;
  })();

  function crc32(bytes) {
    let crc = 0xffffffff;
    for (let i = 0; i < bytes.length; i++) {
      crc = crcTable[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
    }
    return (crc ^ 0xffffffff) >>> 0;
  }

  const enc = new TextEncoder();
  const zipEntries = [];

  function addZipFolder(folderPath) {
    const pathStr = folderPath.endsWith("/") ? folderPath : folderPath + "/";
    zipEntries.push({ nameBytes: enc.encode(pathStr), data: new Uint8Array(0), isDir: true });
  }

  function addZipFile(filePath, uint8Data) {
    zipEntries.push({ nameBytes: enc.encode(filePath), data: uint8Data, isDir: false });
  }

  // Pre-create all 24 folders: 2025, 2023, 2019 Scheme -> Semester 1..8
  const schemesList = INCLUDE_2015_SCHEME
    ? ["1_2025_Scheme", "2_2023_Scheme", "3_2019_Scheme", "4_2015_Scheme"]
    : ["1_2025_Scheme", "2_2023_Scheme", "3_2019_Scheme"];

  const schemeFolderMap = {
    "2025": "1_2025_Scheme",
    "2023": "2_2023_Scheme",
    "2019": "3_2019_Scheme",
    "2015": "4_2015_Scheme",
  };

  for (const sFolder of schemesList) {
    addZipFolder(sFolder);
    for (let sem = 1; sem <= 8; sem++) {
      addZipFolder(`${sFolder}/Semester_${sem}`);
    }
  }

  let completed = 0;
  let succeeded = 0;
  let failed = [];

  async function fetchPaper(item) {
    // Resolve URL properly whether user is on /library/ or /library/index.php
    const resolvedUrl = new URL(item.u, window.location.href).href;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const resp = await fetch(resolvedUrl, { credentials: "include" });
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const buf = await resp.arrayBuffer();
        const bytes = new Uint8Array(buf);
        const folderPrefix = schemeFolderMap[item.s] || `${item.s}_Scheme`;
        const zipPath = `${folderPrefix}/Semester_${item.sem}/${item.fn}`;
        addZipFile(zipPath, bytes);
        succeeded++;
        break;
      } catch (err) {
        if (attempt === 3) {
          console.warn("Failed to download:", item.fn, resolvedUrl, err);
          failed.push({ item, error: String(err) });
        } else {
          await new Promise((r) => setTimeout(r, 800 * attempt));
        }
      }
    }
    completed++;
    const pct = Math.round((completed / targetPapers.length) * 100);
    barEl.style.width = pct + "%";
    statusEl.textContent = `Downloaded ${completed} / ${targetPapers.length} PDFs (${succeeded} OK, ${failed.length} failed) — [${item.s} Scheme • Sem ${item.sem}]`;
  }

  // Download with concurrency pool
  let idx = 0;
  async function worker() {
    while (idx < targetPapers.length) {
      const current = targetPapers[idx++];
      await fetchPaper(current);
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

  statusEl.textContent = `Packing ${succeeded} real PDFs into a single ZIP file...`;

  // Build final binary ZIP archive
  const localParts = [];
  const centralParts = [];
  let offset = 0;

  for (const entry of zipEntries) {
    const nameLen = entry.nameBytes.length;
    const dataLen = entry.data.length;
    const crc = entry.isDir ? 0 : crc32(entry.data);

    const localHeader = new Uint8Array(30 + nameLen);
    const lv = new DataView(localHeader.buffer);
    lv.setUint32(0, 0x04034b50, true); // Local file header signature
    lv.setUint16(4, 20, true);         // Version needed
    lv.setUint16(6, 0x0800, true);     // UTF-8 flag
    lv.setUint16(8, 0, true);          // Store method (0)
    lv.setUint16(10, 0, true);         // Mod time
    lv.setUint16(12, 0x54cf, true);    // Mod date
    lv.setUint32(14, crc, true);
    lv.setUint32(18, dataLen, true);
    lv.setUint32(22, dataLen, true);
    lv.setUint16(26, nameLen, true);
    lv.setUint16(28, 0, true);
    localHeader.set(entry.nameBytes, 30);

    localParts.push(localHeader);
    if (dataLen > 0) localParts.push(entry.data);

    const centralHeader = new Uint8Array(46 + nameLen);
    const cv = new DataView(centralHeader.buffer);
    cv.setUint32(0, 0x02014b50, true); // Central directory signature
    cv.setUint16(4, 20, true);
    cv.setUint16(6, 20, true);
    cv.setUint16(8, 0x0800, true);     // UTF-8 flag
    cv.setUint16(10, 0, true);         // Store method
    cv.setUint16(12, 0, true);
    cv.setUint16(14, 0x54cf, true);
    cv.setUint32(16, crc, true);
    cv.setUint32(20, dataLen, true);
    cv.setUint32(24, dataLen, true);
    cv.setUint16(28, nameLen, true);
    cv.setUint16(30, 0, true);
    cv.setUint16(32, 0, true);
    cv.setUint16(34, 0, true);
    cv.setUint16(36, 0, true);
    cv.setUint32(38, entry.isDir ? 0x10 : 0, true);
    cv.setUint32(42, offset, true);
    centralHeader.set(entry.nameBytes, 46);

    centralParts.push(centralHeader);
    offset += localHeader.length + dataLen;
  }

  const centralSize = centralParts.reduce((acc, p) => acc + p.length, 0);
  const eocd = new Uint8Array(22);
  const ev = new DataView(eocd.buffer);
  ev.setUint32(0, 0x06054b50, true);
  ev.setUint16(4, 0, true);
  ev.setUint16(6, 0, true);
  ev.setUint16(8, zipEntries.length, true);
  ev.setUint16(10, zipEntries.length, true);
  ev.setUint32(12, centralSize, true);
  ev.setUint32(16, offset, true);
  ev.setUint16(20, 0, true);

  const zipBlob = new Blob([...localParts, ...centralParts, eocd], { type: "application/zip" });
  const dlUrl = URL.createObjectURL(zipBlob);
  const a = document.createElement("a");
  a.href = dlUrl;
  a.download = "CUSAT_EEE_Real_Question_Papers_2025_2023_2019_2015.zip";
  document.body.appendChild(a);
  a.click();
  a.remove();

  barEl.style.background = "#22c55e";
  statusEl.innerHTML =
    `<strong>Done!</strong> Downloaded <strong>${succeeded}</strong> real PDFs into ` +
    `<code>CUSAT_EEE_Real_Question_Papers_2025_2023_2019_2015.zip</code>!`;
})();