import mongoose from "mongoose";

const adminNotificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const AdminNotificationModel = mongoose.models.AdminNotification || mongoose.model("AdminNotification", adminNotificationSchema);

export default AdminNotificationModel;
