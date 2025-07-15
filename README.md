# PharmaFlow 💊

PharmaFlow is a full-featured pharmacy management system built with Next.js and Node.js. It’s designed for real-world use in a small pharmacy, enabling efficient inventory control, sales tracking, and reporting — replacing outdated manual methods with a modern web-based solution.

## Features
- 🔐 Secure authentication system (NextAuth / JWT)
- 📦 Inventory tracking with low-stock alerts
- 💰 Sales entry and reports (daily, monthly)
- 👥 Role-based access (admin, staff)
- 📊 Dashboard with summary stats

> This project is part of my portfolio, developed during a school break to deepen my skills in full-stack development.

## Pain Points

1. **Managing inventory** - the app should enable the user to add to, remove from, and analyze the inventory at any given time.

2. **Handling different prices / expiration dates for the same item** - there are scenarios where there are different properties for the same item. One such scenario is when a wholesaler brings a new batch of an item while the item is still in stock with a different price or expiration date.

3. **Informing users when an item is low in stock** - the app should notify users when an item is about to run out.

4. **Informing users when an item is about to expire** - the app should notify users when the expiration date of an item draws near.

5. **Informing users when items are added to the stock** - users should be notified when a new batch of items arrives, and is added to the stock.

6. **Handling different roles** - the app should provide mechanisms to handle users with different roles & privileges, currently, ***Sales***, and ***Admin***.

7. **Ability to manage personnel** - the app should allow admins to add, remove, and update personnels.

8. **Managing wholesalers** - the app should have a feature to allow users, or at least the admin to manage different wholesalers, with the extent of the feature to be determined later.

9. **Sales, and inventory analytics** - the app should provide users with sales, and inventory analytics for different time periods (daily, weekly, monthly).