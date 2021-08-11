const router = require("express").Router();
const { update, deleteUser, resetPass, getProfiles, getProfile, searchProfile, followUser, unfollowUser, updatePic } = require("../controller/Profile");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, path.join(__dirname + "/../assets"))
   },
   filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname.toString())
   }
})

const upload = multer({ storage: storage });

router.get("/", getProfiles);
router.get("/:username", getProfile);
router.get("/search/:query", searchProfile);
router.post("/", update);
router.post("/updatePic", upload.single('profilePic') ,updatePic);
router.post("/resetpass", resetPass);
router.post("/follow", followUser);
router.post("/unfollow", unfollowUser);
router.delete("/:id", deleteUser);

module.exports = router;