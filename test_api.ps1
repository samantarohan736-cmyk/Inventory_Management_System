$ErrorActionPreference = "Continue"

Write-Host "1. Testing /api/reports/low-stock"
$lowStock = Invoke-RestMethod -Uri "http://localhost:8080/api/reports/low-stock?threshold=10" -Method Get
if ($?) {
    Write-Host "Success: $($lowStock | ConvertTo-Json -Depth 2)"
} else {
    Write-Host "Error: $($Error[0].Exception.Message)"
}

Write-Host "`n2. Creating Product TEST-005"
$prodJson = @{
    sku = "TEST-005"
    name = "Some Product"
    price = 15.00
    stockQuantity = 50
} | ConvertTo-Json

$product = Invoke-RestMethod -Uri "http://localhost:8080/api/products" -Method Post -ContentType "application/json" -Body $prodJson
Write-Host "Created Product ID: $($product.id)"

Write-Host "`n3. Testing /api/products/{id}/stock"
if ($product.id) {
    $stock = Invoke-RestMethod -Uri "http://localhost:8080/api/products/$($product.id)/stock?quantityChange=5" -Method Patch
    if ($?) {
        Write-Host "Success: $($stock.stockQuantity)"
    } else {
        Write-Host "Error: $($Error[0].Exception.Message)"
    }
}

Write-Host "`n4. Testing /api/orders"
if ($product.id) {
    $orderJson = @{
        items = @(
            @{ productId = $product.id; quantity = 2 }
        )
    } | ConvertTo-Json -Depth 3
    
    $order = Invoke-RestMethod -Uri "http://localhost:8080/api/orders" -Method Post -ContentType "application/json" -Body $orderJson
    if ($?) {
        Write-Host "Success: $($order.id)"
    } else {
        Write-Host "Error: $($Error[0].Exception.Message)"
    }
}
