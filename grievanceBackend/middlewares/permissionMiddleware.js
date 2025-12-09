

const checkPermission = (permission)=>{
    return (req,res, next) => {
        if(!req.user || !req.user.role || !req.user.role.permission.includes(permission)){
            return res.status(403).json({ message: "Access denied" });
        }
        next();
    }

}

export default checkPermission;