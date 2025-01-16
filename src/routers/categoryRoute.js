import express from 'express';
import { listCategory } from '../controller/categoryController.js';
const router= express.Router();
router.get('/',listCategory);
router.get("/create",function(req,res){
    res.send('create  category')
})
export default router