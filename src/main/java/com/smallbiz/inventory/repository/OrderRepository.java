package com.smallbiz.inventory.repository;

import com.smallbiz.inventory.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    // For reporting recent orders
    @Query("SELECT o FROM OrderTable o WHERE o.orderDate > :date")
    List<Order> findByOrderDateAfter(@Param("date") LocalDateTime date);
}
