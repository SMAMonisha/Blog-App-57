import {getDataJSON,storeDataJSON} from "./AsyncStorageFunctions";

const NotificationFunction = async(value)=>{
    let notifies=[];
    
    try{
        let AllNotification=await getDataJSON('notification');
        if(AllNotification!=null){
            AllNotification.push(value)
            await storeDataJSON('notification',AllNotification);
        }
        else{
            notifies.push(value)
            await storeDataJSON('notification',notifies);
        }
    }catch(error){
        console.log(error)
    }
};

export default NotificationFunction;