
const logOutController = {};

logOutController.logOut= async (req, res) => {

    res.clearCookie("authCookie");
    return res.status(200).json({message: "Logout Exitoso"})
}

export default logOutController;