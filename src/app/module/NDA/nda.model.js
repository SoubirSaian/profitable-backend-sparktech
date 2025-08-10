import mongoose from "mongoose";


const ndaSchema =  new mongoose.Schema({
    purpose:{
        type: String
    },
    definitionOfConfidentialInformation:{
        type: String
    },
    obligation:{
        type: String
    },
    exception:{
        type: String
    },
    noGuarantee:{
        type: String
    },
    
    dataComplience:{
        type: String
    },
    durationAndEnforcement:{
        type: String
    },
    loverningLaw:{
        type: String
    },
    entireAgreement:{
        type: String
    },
    acknowledgement:{
        type: String
    },
    role:{
        type: String
    }
});


const NDAModel = mongoose.models.NDA || mongoose.model("NDA",ndaSchema);

export default NDAModel;