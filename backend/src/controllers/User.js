const { User } = require("../schema");
const { fetchUserById, deleteUser, updatePasswordById, updateUserById, updateUserProfileById } = require("../services");

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await fetchUserById(id);
        if (!user) return res.status(203).json({ data: {} });
        return res.status(200).json({ data: user.data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}

const updateUserProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const file = req.file;
        const result = await updateUserProfileById(id, file.buffer);
        if (!result) return res.status(400).json({ error: "UnExpected Error While Updating the User" });
        return res.status(200).json({ message: "Profile updated Successfully!!" })
    } catch (error) {
        console.log(error);
        return res.json({ error: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { company, dob } = req.body;
        const result = await updateUserById(id, { company, dob: new Date(dob) });
        if (!result) return res.status(400).json({ error: "company,dob is required" })
        return res.status(200).json({ message: "User updated Successfully" });
    } catch (error) {
        console.log(error);
        return res.json({ error: error.message });
    }
}


const updatePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { newPassword, oldPassword } = req.body
        const result = await updatePasswordById(id, newPassword, oldPassword);
        if (!result) return res.status(400).json({ error: "In correct Password" })
        return res.status(200).json({ message: "Success" });
    } catch (error) {
        console.log(error);
        return res.json({ error: error.message });
    }
}

const deleteAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await deleteUser(id);
        if (!result) return res.json(400).json({ error: "Unexpected Error while deleting the User" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getUser,
    updateUser,
    deleteAccount,
    updatePassword,
    updateUserProfile
};