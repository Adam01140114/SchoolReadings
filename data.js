/* School Readings: the reading list, one entry per course.
 * Edit this file to add or change readings; the page builds itself from it.
 *
 * source: 'drive'     -> a copy saved in Google Drive
 *         'bookstore' -> the UCSC bookstore listing (still to buy)
 * hue:    the course's accent colour (0-360), used for its badge and divider
 */
window.READINGS = {
  term: 'Fall',
  updated: '2026-11-20',
  courses: [
    {
      code: 'EDUC 220',
      name: 'Reading and Language Arts for Elementary Classrooms',
      hue: 212,
      readings: [
        {
          title: 'Reading Above the Fray',
          subtitle: 'Reliable, Research-Based Routines for Developing Decoding Skills',
          authors: 'Julia B. Lindsey',
          year: 2022,
          cover: 'covers/reading-above-the-fray.jpg',
          url: 'https://drive.google.com/file/d/1Qjh0knvggKj5gHwuAuLGE46Ha2FqSWF5/view',
          source: 'drive',
        },
        {
          title: 'The Reading Strategies Book 2.0',
          subtitle: 'Your Research-Based Guide to Developing Skilled Readers',
          authors: 'Jennifer Serravallo',
          year: 2023,
          cover: 'covers/reading-strategies-book-2.png',
          url: 'https://drive.google.com/file/d/1LRA4FSl03NQuVPIlDRF3t82WmKVVKZJm/view?usp=sharing',
          source: 'drive',
        },
      ],
    },
    {
      code: 'EDUC 211',
      section: '01',
      name: 'Teaching Special Populations in the General Education Classroom',
      hue: 268,
      readings: [
        {
          title: 'Case Studies in Special Education',
          subtitle: 'A Social Justice Perspective',
          authors: 'Tera Torres & Catherine R. Barber',
          cover: 'covers/case-studies-special-ed.png',
          url: 'https://drive.google.com/file/d/1N80YWR4-Y_VqYxwEbqKaX-rqMSc_IiuO/view?usp=sharing',
          source: 'drive',
        },
        {
          title: 'UDL Now!',
          subtitle: "A Teacher's Guide to Applying Universal Design for Learning",
          authors: 'Katie Novak',
          edition: '3rd ed.',
          cover: 'covers/udl-now.png',
          url: 'https://drive.google.com/file/d/1G2SCyvQt0xjFtnR48IB8RtEFGpiro5Qn/view?usp=sharing',
          source: 'drive',
        },
      ],
    },
    {
      code: 'EDUC 200',
      name: 'Beginning Student Teaching',
      hue: 152,
      readings: [
        {
          title: 'Kids 1st From Day One',
          subtitle: "A Teacher's Guide to Today's Classrooms",
          authors: 'Christine Hertz & Kristine Mraz',
          cover: 'covers/kids-1st-from-day-one.png',
          url: 'https://drive.google.com/file/d/1s3BCt0U5Y2q-dZXz1I4YbLD1WTgziXHR/view?usp=sharing',
          source: 'drive',
        },
      ],
    },
    {
      code: 'EDUC 222',
      section: '01',
      name: 'Mathematics Learning and Teaching in Elementary Classrooms',
      hue: 24,
      readings: [
        {
          title: 'Rethinking Disability and Mathematics',
          subtitle: 'A UDL Math Classroom Guide for Grades K-8',
          authors: 'Rachel Lambert',
          year: 2024,
          cover: 'covers/rethinking-disability-math.png',
          url: 'https://drive.google.com/file/d/1j4Bk88U30UMQbXkKA438tXPUfaqFS6t2/view?usp=sharing',
          source: 'drive',
        },
        {
          title: "Children's Mathematics",
          subtitle: 'Cognitively Guided Instruction',
          authors: 'Thomas P. Carpenter, Elizabeth Fennema, Megan Loef Franke, Linda Levi & Susan B. Empson',
          edition: '2nd ed.',
          cover: 'covers/childrens-mathematics.jpg',
          url: 'https://ucsc.textbookx.com/book/Childrens-Mathematics-Second-Edition/9780325052878/?course_id=5592943',
          source: 'bookstore',
          optional: true,
        },
      ],
    },
    {
      code: 'EDUC 212A',
      section: '01',
      name: 'Bilingualism and Biliteracy: History, Politics, Theory, and Practice',
      hue: 336,
      readings: [],
      note: "Unknown: I don't think we have any course readings we have to buy.",
    },
    {
      code: 'EDUC 214',
      section: '01',
      name: 'Contemporary Issues in Education',
      hue: 188,
      readings: [],
      note: "Unknown: I don't think we have any course readings we have to buy.",
    },
  ],
};
