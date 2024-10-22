const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const auth = require('../middleware/authMiddleware');

// Add new expense
// router.post('/', auth, async (req, res) => {
//   try {
//     const { icon, name, amount, items } = req.body;
    
//     // Create new expense
//     const expense = new Expense({
//       user: req.userId,  // From auth middleware
//       category,
//       name,
//       amount,
//       items
//     });

//     // Save to database
//     const savedExpense = await expense.save();

//     res.status(201).json(savedExpense);
//   } catch (error) {
//     console.error('Error adding expense:', error);
//     res.status(500).json({ message: 'Error adding expense', error: error.message });
//   }
// });

// router.post('/', auth, async (req, res) => {
//     // try {
//     //   // Find existing expense document for the user
//     //   let expense = await Expense.findOne({ user: req.userId });
      
//     //   if (expense) {
//     //     // Update existing expense document
//     //     expense.categories = req.body.categories;
//     //     await expense.save();
//     //   } else {
//     //     // Create new expense document
//     //     expense = new Expense({
//     //       user: req.userId,
//     //       categories: req.body.categories
//     //     });
//     //     await expense.save();
//     //   }
  
//     //   res.status(201).json(expense);
//     // } catch (error) {
//     //   console.error('Error saving expenses:', error);
//     //   res.status(500).json({ message: 'Error saving expenses', error: error.message });
//     // }
//     try {
//         const expense = await Expense.findOneAndUpdate(
//           { user: req.userId }, // find condition
//           { 
//             $set: {
//               categories: req.body.categories
//             }
//           },
//           {
//             new: true, // return updated document
//             upsert: true, // create if doesn't exist
//             runValidators: true // run schema validation on update
//           }
//         );
    
//         res.status(201).json(expense);
//       } catch (error) {
//         console.error('Error saving expenses:', error);
//         res.status(500).json({ message: 'Error saving expenses', error: error.message });
//       }
//   });

  router.post('/', auth, async (req, res) => {
    try {
      const { categories } = req.body;
      const userId = req.query.userId || req.user._id;
      // const userId = req.params.userId;
      // console.log(userId)

      // Calculate the total for each category based on its items
      categories.forEach(category => {
        category.amount = category.items.reduce((total, item) => total + item.amount, 0);
      });
  
      // Update the user's expense data
      const expense = await Expense.findOneAndUpdate(
        { user: userId },
        {
          $set: {
            categories: categories, // Update all categories
          },
        },
        {
          new: true,
          upsert: true,
          runValidators: true,
        }
      );
      
      res.status(201).json(expense);
    } catch (error) {
      console.error('Error saving expenses:', error);
      res.status(500).json({ message: 'Error saving expenses', error: error.message });
    }
  });

  router.get('/', auth, async (req, res) => {
    try {
      // Use userId from the request query or fall back to authenticated user's ID
      const userId = req.query.userId || req.user._id;
      console.log(userId, "user Id")
  
      // Fetch the expense data for the user
      const expense = await Expense.findOne({ user: userId });
  
      if (!expense) {
        return res.status(404).json({ message: 'Expenses not found for this user' });
      }
      console.log(expense)
      // Send the expense data as the response
      res.status(200).json(expense);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      res.status(500).json({ message: 'Error fetching expenses', error: error.message });
    }
  });  
  

// Get all expenses for a user
// router.get('/api/expenses', auth, async (req, res) => {
//   try {
//     const expenses = await Expense.find({ user: req.userId });
//     res.json(expenses);
//   } catch (error) {
//     console.error('Error fetching expenses:', error);
//     res.status(500).json({ message: 'Error fetching expenses', error: error.message });
//   }
// });

// // Get single expense
// router.get('/api/expenses/:id', auth, async (req, res) => {
//   try {
//     const expense = await Expense.findOne({
//       _id: req.params.id,
//       user: req.userId
//     });
    
//     if (!expense) {
//       return res.status(404).json({ message: 'Expense not found' });
//     }
    
//     res.json(expense);
//   } catch (error) {
//     console.error('Error fetching expense:', error);
//     res.status(500).json({ message: 'Error fetching expense', error: error.message });
//   }
// });

// // Update expense
// router.put('/api/expenses/:id', auth, async (req, res) => {
//   try {
//     const { icon, name, amount, items } = req.body;
    
//     const expense = await Expense.findOneAndUpdate(
//       { _id: req.params.id, user: req.userId },
//       { icon, name, amount, items },
//       { new: true }
//     );
    
//     if (!expense) {
//       return res.status(404).json({ message: 'Expense not found' });
//     }
    
//     res.json(expense);
//   } catch (error) {
//     console.error('Error updating expense:', error);
//     res.status(500).json({ message: 'Error updating expense', error: error.message });
//   }
// });

// // Delete expense
// router.delete('/api/expenses/:id', auth, async (req, res) => {
//   try {
//     const expense = await Expense.findOneAndDelete({
//       _id: req.params.id,
//       user: req.userId
//     });
    
//     if (!expense) {
//       return res.status(404).json({ message: 'Expense not found' });
//     }
    
//     res.json({ message: 'Expense deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting expense:', error);
//     res.status(500).json({ message: 'Error deleting expense', error: error.message });
//   }
// });



module.exports = router;