const doctorModel = require("../models/doctorModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");

const loginDoctor = async (req, res) => {
  const { email, password } = req.body;
  try {
    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res.json({
        success: false,
        message: "doctor does not exist",
      });
    }
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "invalid email or password",
      });
    }
    const token = createToken(doctor._id, "doctor");
    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "error!",
    });
  }
};

const createToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET);
};


const signupDoc = async (req, res) => {
  const { name, password, email, jobTitle,hospital } = req.body;
  let imageName = req.file.filename;
  try {
    console.log("Request Body:", req.body);

    const exists = await doctorModel.findOne({ email });
    console.log("Doctor Exists:", exists);

    if (exists) {
      return res.json({ success: false, message: "Doctor already exists" });
    }

    console.log("Validating email...");
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email" });
    }

    console.log("Hashing password...");
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    console.log("Hashed Password:", hashed);

    const newDoc = new doctorModel({ name, email, password: hashed , jobTitle, hospital, image: imageName});
    const doctor = await newDoc.save();
    console.log("New Doctor:", doctor);

    const token = createToken(doctor._id, "doctor");


    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "error!",
    });
  }
};

listDoctor = async (req, res) => {
  try {
    const doctor = await doctorModel.find({});
    const updatedDoctors = doctor.map(doctor => ({
      ...doctor.toObject(),
      image: doctor.image ? `${req.protocol}://${req.get('host')}/uploads/${doctor.image}` : null,
    }));

    res.json({ success: true, data: updatedDoctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
};

getDoc = async (req, res, next) => {
  try {
    const doctor = await doctorModel.findById(req.params.id);
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }
    res.json({ success: true, data: doctor });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
};

module.exports = { loginDoctor, listDoctor, signupDoc, getDoc };
