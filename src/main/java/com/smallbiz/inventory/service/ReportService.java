package com.smallbiz.inventory.service;

import com.smallbiz.inventory.entity.Order;
import com.smallbiz.inventory.entity.Product;
import com.smallbiz.inventory.repository.OrderRepository;
import com.smallbiz.inventory.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReportService {

    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    public ReportService(ProductRepository productRepository, OrderRepository orderRepository) {
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
    }

    public List<Product> getLowStockProducts(Integer threshold) {
        int limit = threshold != null ? threshold : 10;
        return productRepository.findLowStockProducts(limit);
    }

    public Map<String, Object> getSalesReport(int days) {
        LocalDateTime startDate = LocalDateTime.now().minusDays(days);
        List<Order> recentOrders = orderRepository.findByOrderDateAfter(startDate);

        long totalOrders = recentOrders.size();
        double totalRevenue = recentOrders.stream()
                .mapToDouble(order -> order.getTotalAmount().doubleValue())
                .sum();

        Map<String, Object> report = new HashMap<>();
        report.put("periodDays", days);
        report.put("totalOrders", totalOrders);
        report.put("totalRevenue", totalRevenue);

        return report;
    }

    public Map<String, Object> getInventoryValuation() {
        List<Product> allProducts = productRepository.findAll();

        double totalValue = allProducts.stream()
                .mapToDouble(p -> p.getPrice().doubleValue() * p.getStockQuantity())
                .sum();

        Map<String, Object> report = new HashMap<>();
        report.put("totalProducts", allProducts.size());
        report.put("totalInventoryValue", totalValue);

        return report;
    }
}
