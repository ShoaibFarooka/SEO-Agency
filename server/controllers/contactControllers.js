import Contact from "../models/ContactModel.js";

const Addmessages = async (req, res, next) => {
  try {
    const {
      websiteURL,
      companyName,
      firstName,
      lastName,
      email,
      message,
      phone,
      reason,
    } = req.body;
    if (!websiteURL || !companyName || !email) {
      console.log('Empty Fields...');
      return res.json({ message: " Please fill all Fields" });
    }
    const newSEO = new Contact({
      websiteURL,
      companyName,
      firstName,
      lastName,
      email,
      message,
      phone,
      reason,
    });
    await newSEO.save();
    return res.json({ message: "Your message is recorded" });
  } catch (error) {
    next(error);
  }
};

const getALLmessages = async (req, res, next) => {
  try {
    const allSEOAgency = await Contact.find();
    return res.json(allSEOAgency);
  } catch (error) {
    next(error);
  }
};

export { getALLmessages, Addmessages };
