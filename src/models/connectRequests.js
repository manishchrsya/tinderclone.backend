const mongoose = require("mongoose");

const connectRequestsSchema = new mongoose.Schema(
    {
        fromUserId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        toUserId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        status: {
            type: String,
            required: true,
            enum: {
                values: ["ignore", "interested", "accepted", "rejected"],
                message: `{VALUE} is incorrect value`
            }
        }
    },
    { timestamps: true }
);

// connectRequestsSchema.index({ fromUserId, toString });

connectRequestsSchema.pre("save", function (next) {
    const connectionRequest = this;
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("Can not send request to your self");
    }
    next();
});

const connectionRequestModel = new mongoose.model("ConnectionRequest", connectRequestsSchema);

module.exports = connectionRequestModel;