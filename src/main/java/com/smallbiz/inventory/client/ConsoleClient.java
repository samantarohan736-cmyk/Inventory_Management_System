package com.smallbiz.inventory.client;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Scanner;

public class ConsoleClient {

    private static final String BASE_URL = "http://localhost:8081/api";
    private static final HttpClient client = HttpClient.newHttpClient();
    private static final Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        boolean exit = false;
        while (!exit) {
            printMenu();
            System.out.print("\nEnter your choice: ");
            String choice = scanner.nextLine();

            try {
                switch (choice) {
                    case "1":
                        listAllProducts();
                        break;
                    case "2":
                        viewProductStock();
                        break;
                    case "3":
                        orderItem();
                        break;
                    case "4":
                        lowStockReport();
                        break;
                    case "5":
                        inventoryValuationReport();
                        break;
                    case "6":
                        salesReport();
                        break;
                    case "7":
                        exit = true;
                        System.out.println("Exiting application...");
                        break;
                    default:
                        System.out.println("Invalid choice. Please enter a number between 1 and 7.");
                }
            } catch (Exception e) {
                System.out.println("An error occurred: " + e.getMessage());
            }
        }
        scanner.close();
    }

    private static void printMenu() {
        System.out.println("\n--- Inventory Management System ---");
        System.out.println("1. List All Products");
        System.out.println("2. View Product Stock");
        System.out.println("3. Order Item");
        System.out.println("4. Low Stock Report");
        System.out.println("5. Inventory Valuation Report");
        System.out.println("6. Sales Report");
        System.out.println("7. Exit");
    }

    private static void listAllProducts() throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(BASE_URL + "/products"))
                .GET()
                .build();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println("\n--- Products ---");
        System.out.println(response.body());
    }

    private static void viewProductStock() throws Exception {
        System.out.print("Enter Product ID: ");
        String id = scanner.nextLine();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(BASE_URL + "/products/" + id))
                .GET()
                .build();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println("\n--- Product Info ---");
        System.out.println(response.statusCode() == 200 ? response.body() : "Product not found.");
    }

    private static void orderItem() throws Exception {
        System.out.print("Enter Product ID to order: ");
        String idString = scanner.nextLine();

        System.out.print("Enter Quantity: ");
        String quantityString = scanner.nextLine();

        try {
            Long productId = Long.parseLong(idString);
            Integer quantity = Integer.parseInt(quantityString);

            // Manual JSON construction to avoid external dependencies
            String jsonBody = String.format("{\"items\":[{\"productId\":%d,\"quantity\":%d}]}", productId, quantity);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(BASE_URL + "/orders"))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() >= 200 && response.statusCode() < 300) {
                System.out.println("\nOrder placed successfully!");
                System.out.println(response.body());
            } else {
                System.out.println("\nFailed to place order. Status code: " + response.statusCode());
                System.out.println(response.body());
            }

        } catch (NumberFormatException e) {
            System.out.println("Invalid input. Product ID and Quantity must be numbers.");
        }
    }

    private static void lowStockReport() throws Exception {
        System.out.print("Enter Threshold (press Enter for default 10): ");
        String threshold = scanner.nextLine();
        String uri = BASE_URL + "/reports/low-stock";
        if (!threshold.trim().isEmpty()) {
            uri += "?threshold=" + threshold.trim();
        }

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(uri))
                .GET()
                .build();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println("\n--- Low Stock Report ---");
        System.out.println(response.body());
    }

    private static void inventoryValuationReport() throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(BASE_URL + "/reports/valuation"))
                .GET()
                .build();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println("\n--- Inventory Valuation ---");
        System.out.println(response.body());
    }

    private static void salesReport() throws Exception {
        System.out.print("Enter number of days (press Enter for default 7): ");
        String days = scanner.nextLine();
        String uri = BASE_URL + "/reports/sales";
        if (!days.trim().isEmpty()) {
            uri += "?days=" + days.trim();
        }

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(uri))
                .GET()
                .build();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println("\n--- Sales Report ---");
        System.out.println(response.body());
    }
}
