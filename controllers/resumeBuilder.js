import { generateResume } from "../utils/resumeBuilder.js";

export const resumeBuilder = async (req, res) => {
  const {
    fullName,
    email,
    phone,
    summary,
    educationDegree,
    educationInstitution,
    experiencePosition,
    experienceCompany,
    experienceDescription,
    skills,
    projectName,
    projectDescription
  } = req.body;

  // Validate required fields
  if (
    !fullName ||
    !email ||
    !phone ||
    !summary ||
    !educationDegree ||
    !educationInstitution ||
    !experiencePosition ||
    !experienceCompany ||
    !experienceDescription ||
    !skills || !Array.isArray(skills) || skills.length === 0 ||
    !projectName ||
    !projectDescription
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields"
    });
  }

  const userInput = {
    fullName,
    email,
    phone,
    summary,
    educationDegree,
    educationInstitution,
    experiencePosition,
    experienceCompany,
    experienceDescription,
    skills,
    projectName,
    projectDescription
  };

  try {
    const resume_data = await generateResume(userInput);

    if (!resume_data) {
      return res.status(500).json({
        success: false,
        message: "Failed to generate resume. Please try again later."
      });
    }

    return res.status(200).json({
      success: true,
      resume: resume_data
    });

  } catch (err) {
    console.error("Error in resumeBuilder:", err.message);
    return res.status(500).json({
      success: false,
      message: "Server error while generating resume"
    });
  }
};
