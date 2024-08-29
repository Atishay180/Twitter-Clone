import { Notification } from "../models/notification.model.js"

const getNotification = async (req, res) => {
    try {
        const userId = req.user._id

        const notications = await Notification
            .find({ to: userId })
            .populate({
                "path": "from",
                "select": "username profileImg"
            })

        await Notification.updateMany({ to: userId }, { read: true })
        return res
            .status(200)
            .json(notications)

    } catch (error) {
        console.error("Error in getNotification controller", error.message)
        return res
            .status(500)
            .json({ message: "Internal server error" })
    }
}

const deleteNotification = async (req, res) => {
    try {
        const userId = req.user._id

        await Notification.deleteMany({ to: userId })

        return res
            .status(200)
            .json({ message: "Notifications deleted successfully" })

    } catch (error) {
        console.error("Error in deleteNotification controller", error.message)
        return res
            .status(500)
            .json({ message: "Internal server error" })
    }
}

export { getNotification, deleteNotification }