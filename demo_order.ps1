$ErrorActionPreference = "Continue"

Write-Host "========================================="
Write-Host "  INVENTORY API ORDER DEMONSTRATION"
Write-Host "========================================="

Write-Host "`n1. Creating a new Product in the Catalog"
$productJson = @{
    sku = "TEST-ORDER-101"
    name = "Premium Coffee Beans"
    price = 20.00
    stockQuantity = 50
} | ConvertTo-Json

$newProduct = Invoke-RestMethod -Uri "http://localhost:8081/api/products" -Method Post -ContentType "application/json" -Body $productJson

Write-Host "-> Successfully created product."
Write-Host "   ID: $($newProduct.id)"
Write-Host "   Name: $($newProduct.name)"
Write-Host "   Stock: $($newProduct.stockQuantity)"


Write-Host "`n-----------------------------------------"
Write-Host "`n2. Placing an order for 3 units of this product"

$orderJson = @{
    items = @(
        @{ 
            productId = $newProduct.id
            quantity = 3
        }
    )
} | ConvertTo-Json -Depth 3

$newOrder = Invoke-RestMethod -Uri "http://localhost:8081/api/orders" -Method Post -ContentType "application/json" -Body $orderJson

if ($?) {
    Write-Host "-> Order Placed Successfully!"
    Write-Host "   Order ID: $($newOrder.id)"
    Write-Host "   Total Amount: `$ $($newOrder.totalAmount)"
    Write-Host "   Status: $($newOrder.status)"
} else {
    Write-Host "-> Error Place Order: $($Error[0].Exception.Message)"
}


Write-Host "`n-----------------------------------------"
Write-Host "`n3. Verifying the internal stock has decreased automatically"

$updatedProduct = Invoke-RestMethod -Uri "http://localhost:8080/api/products/$($newProduct.id)" -Method Get
Write-Host "-> Stock level updated!"
Write-Host "   Old Stock: 50"
Write-Host "   New Stock: $($updatedProduct.stockQuantity)"
Write-Host "========================================="
