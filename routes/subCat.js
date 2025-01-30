// import express from 'express'
// import { SubCategory } from '../models/subCat.js'


// const router = express.Router()

// router.get('/', async (req, res) => {

//     try {
//         const page = parseInt(req.query.page) || 1
//         const perPage = parseInt(req.query.perPage)
//         const totalPosts = await SubCategory.countDocuments();
//         const totalPages = Math.ceil(totalPosts / perPage)

//         let subCategoryList = [];

//         if (page > totalPages) {
//             return res.status(404).json({ message: "No data found!" })
//         }

//         if (req.query.page !== undefined && req.query.perPage !== undefined) {
//             subCategoryList = await SubCategory.find().populate("category")
//                 .skip((page - 1) * perPage)
//                 .limit(perPage)
//                 .exec()
//         } else {
//             subCategoryList = await SubCategory.find().populate("category")
//         }

//         if (!subCategoryList) {
//             return res.status(500).json({ success: false })
//         }

//         return res.status(200).json({
//             "subCategoryList": subCategoryList,
//             "totalPages": totalPages,
//             "page": page
//         });

//     } catch (error) {
//         res.status(500).json({ success: false })

//     }
// })

// router.get('/:id', async (req, res) => {

//     const subCat = await SubCategory.findById(req.params.id).populate("category")

//     if (!subCat) {
//         return res.status(500).json({ message: 'The sub category with the given ID was not found' })
//     }

//     return res.status(200).send(subCat)
// })

// router.post('/create', async (req, res) => {

//     let subCat = new SubCategory({
//         subCat: req.body.subCat,
//         category: req.body.category
//     })

//     if (!subCat) {
//         return res.status(500).json({
//             error: err,
//             success: false
//         })
//     }

//     subCat = await subCat.save()

//     return res.status(201).json(subCat)
// })

// router.delete('/:id', async (req, res) => {

//     const deletedSubCat = await SubCategory.findByIdAndDelete(req.params.id)

//     if (!deletedSubCat) {
//         return res.status(404).json({
//             message: 'Sub Category not found!',
//             success: false
//         })
//     }

//     return res.status(200).json({
//         success: true,
//         message: 'Sub Category Deleted!'
//     })
// })

// router.put('/:id', async (req, res) => {

//     const subCat = await SubCategory.findByIdAndUpdate(
//         req.params.id,
//         {
//             category: req.body.category,
//             subCat: req.body.subCat
//         },
//         { new: true }
//     )

//     if (!subCat) {
//         return res.status(500).json({
//             message: 'Sub Category cannot be updated',
//             success: false
//         })
//     }

//     return res.send(subCat);
// })

// export default router;  