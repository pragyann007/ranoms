// 1.Career suggestions from ai 
// This type of request is acepted from frontend:
const request = {
  "answer1": "I like computer science and a bit of maths. I enjoy solving problems and building small apps.",
  "answer2": "I like creative things and also coding, like making websites or apps that look cool.",
  "answer3": "I prefer working with ideas and computers, not much with people tbh.",
  "answer4": "I want to earn good money and also be free to work from anywhere.",
  "answer5": "I know HTML, CSS, little bit of JS. I also like editing videos and designing posts on Canva."
}

// 1. backend send this type of response 
const suggestions = [
  {
    "id": 1,
    "careerName": "Mobile App Developer",
    "match": "Combines coding skills with creativity to build visually appealing apps and websites.",
    "future": "Growing demand for mobile apps and increasing use of smartphones.",
    "ytsearchtitle": "How to become a mobile app developer"
  },
  {
    "id": 2,
    "careerName": "Frontend Developer",
    "match": "Focuses on building user interfaces and user experiences for websites and apps.",
    "future": "Continued growth in e-commerce and online services.",
    "ytsearchtitle": "Frontend development tutorial for beginners"
  },
  {
    "id": 3,
    "careerName": "UX/UI Designer",
    "match": "Designs user interfaces and experiences that are visually appealing and user-friendly.",
    "future": "Increasing demand for digital products and services.",
    "ytsearchtitle": "How to become a UX/UI designer"
  }
]
// 1. backend route: http://localhost:8080/api/career/suggestions -POST

// 2. after the carear suggestion comes there should be 2 option one to view more details and other is for resource 
// 2. when suggesting carear the yt search query is also sent frontend should send that query parameter when user clicks at view resource 
// then backend sens the data for resource like this :

const resourceVdo=[
  {
    "title": "The Complete Frontend Developer Roadmap",
    "videoUrl": "https://www.youtube.com/watch?v=Tef1e9FiSR0",
    "thumbnail": "https://i.ytimg.com/vi/Tef1e9FiSR0/hqdefault.jpg",
    "channel": "Programming with Mosh"
  },
  {
    "title": "Become a Front-End Developer in 100 Days !",
    "videoUrl": "https://www.youtube.com/watch?v=ZUXKG3JFszc",
    "thumbnail": "https://i.ytimg.com/vi/ZUXKG3JFszc/hqdefault.jpg",
    "channel": "Shweta"
  },
  {
    "title": "Frontend Web Development Bootcamp Course (JavaScript, HTML, CSS)",
    "videoUrl": "https://www.youtube.com/watch?v=zJSY8tbf_ys",
    "thumbnail": "https://i.ytimg.com/vi/zJSY8tbf_ys/hqdefault.jpg",
    "channel": "freeCodeCamp.org"
  },
  {
    "title": "Frontend web development - a complete overview",
    "videoUrl": "https://www.youtube.com/watch?v=WG5ikvJ2TKA",
    "thumbnail": "https://i.ytimg.com/vi/WG5ikvJ2TKA/hqdefault.jpg",
    "channel": "SuperSimpleDev"
  },
  {
    "title": "Learning Frontend Development in 2025 lol",
    "videoUrl": "https://www.youtube.com/watch?v=vTuL2_4VOBA",
    "thumbnail": "https://i.ytimg.com/vi/vTuL2_4VOBA/hqdefault.jpg",
    "channel": "Devression"
  }
]

// 3. resume building backend expects this data from frontend:
const resumeData = {
  fullName: "John Doe",
  email: "john@example.com",
  phone: "+977 9800000000",
  summary: "A passionate frontend developer.",
  educationDegree: "Bachelor in Computer Science",
  educationInstitution: "Nami College",
  experiencePosition: "Frontend Intern",
  experienceCompany: "Skillspirint",
  experienceDescription: "Worked on modern web app UI.",
  skills: ["HTML", "CSS", "JavaScript", "React"],
  projectName: "AI Job Finder",
  projectDescription: "A smart job-matching platform using AI.",
};

// 3.backend changes this data to this : backend response 
const enhanceed_resume_data = {
  "success": true,
  "resume": {
    "fullName": "John Doe",
    "contact": {
      "email": "john@example.com",
      "phone": "+977 9800000000"
    },
    "summary": "A passionate and detail-oriented frontend developer with a strong foundation in modern web technologies, seeking to leverage technical skills and creativity in a collaborative team environment.",
    "education": {
      "degree": "Bachelor in Computer Science",
      "institution": "Nami College"
    },
    "experience": {
      "position": "Frontend Intern",
      "company": "Skillspirint",
      "description": "Worked on the development and optimization of modern web application user interfaces, contributing to project success through clean, efficient code."
    },
    "skills": [
      "HTML",
      "CSS",
      "JavaScript",
      "React"
    ],
    "projects": [
      {
        "name": "AI Job Finder",
        "description": "A smart job-matching platform powered by AI, designed to efficiently connect candidates with their ideal opportunities."
      }
    ]
  }
}




