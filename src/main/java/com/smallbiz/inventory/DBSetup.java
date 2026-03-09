package com.smallbiz.inventory;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

public class DBSetup {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/inventorydb";
        String user = "root";
        String password = "Sql@1234";

        try (Connection conn = DriverManager.getConnection(url, user, password)) {
            System.out.println("Connected to MySQL successfully!");

            // Insert Admin
            String insertAdmin = "INSERT IGNORE INTO users (name, email, password, role) VALUES ('Admin', 'admin@example.com', 'admin123', 'ADMIN')";
            try (PreparedStatement stmt = conn.prepareStatement(insertAdmin)) {
                stmt.executeUpdate();
                System.out.println("Inserted Admin user.");
            }

            // Update Products
            String[] updateQueries = {
                    "UPDATE products SET image_url='https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500', category='Electronics', rating=4.5 WHERE id=1",
                    "UPDATE products SET image_url='https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500', category='Audio', rating=4.8 WHERE id=2",
                    "UPDATE products SET image_url='https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500', category='Footwear', rating=4.2 WHERE id=3",
                    "UPDATE products SET image_url='https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=500', category='Accessories', rating=4.6 WHERE id>3"
            };

            for (String query : updateQueries) {
                try (PreparedStatement stmt = conn.prepareStatement(query)) {
                    stmt.executeUpdate();
                }
            }
            System.out.println("Updated product dummy data with images and categories.");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
