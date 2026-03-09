package com.smallbiz.inventory.service;

import com.smallbiz.inventory.dto.OrderItemRequest;
import com.smallbiz.inventory.dto.OrderRequest;
import com.smallbiz.inventory.entity.Order;
import com.smallbiz.inventory.entity.OrderItem;
import com.smallbiz.inventory.entity.Product;
import com.smallbiz.inventory.repository.OrderRepository;
import com.smallbiz.inventory.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    public OrderService(OrderRepository orderRepository, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id " + id));
    }

    @Transactional
    public Order createOrder(OrderRequest request) {
        Order order = new Order();
        BigDecimal totalAmount = BigDecimal.ZERO;

        for (OrderItemRequest itemRequest : request.getItems()) {
            Product product = productRepository.findById(itemRequest.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found with id " + itemRequest.getProductId()));

            int quantity = itemRequest.getQuantity();

            if (product.getStockQuantity() < quantity) {
                throw new RuntimeException("Insufficient stock for product " + product.getName() + ". Available: "
                        + product.getStockQuantity());
            }

            // Reduce stock
            product.setStockQuantity(product.getStockQuantity() - quantity);
            productRepository.save(product);

            // Create OrderItem
            OrderItem orderItem = new OrderItem(product, quantity, product.getPrice());
            order.addItem(orderItem);

            // Calculate amount
            totalAmount = totalAmount.add(product.getPrice().multiply(new BigDecimal(quantity)));
        }

        order.setTotalAmount(totalAmount);
        order.setStatus("COMPLETED"); // Assuming immediate completion for small biz logic
        return orderRepository.save(order);
    }
}
