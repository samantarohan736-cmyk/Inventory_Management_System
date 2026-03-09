package com.smallbiz.inventory.controller;

import com.smallbiz.inventory.entity.Product;
import com.smallbiz.inventory.service.ReportService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/low-stock")
    public List<Product> getLowStockProducts(@RequestParam(required = false, defaultValue = "10") Integer threshold) {
        return reportService.getLowStockProducts(threshold);
    }

    @GetMapping("/sales")
    public Map<String, Object> getSalesReport(@RequestParam(required = false, defaultValue = "7") Integer days) {
        return reportService.getSalesReport(days);
    }

    @GetMapping("/valuation")
    public Map<String, Object> getInventoryValuation() {
        return reportService.getInventoryValuation();
    }
}
