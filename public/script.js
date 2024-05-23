document.getElementById('addProductBtn').addEventListener('click', async (e) => {
  e.preventDefault();

  const form = document.getElementById('productForm');
  const formData = new FormData(form);

  const productData = {
    productName: formData.get('productName'),
    price: parseFloat(formData.get('price')),
    size: formData.get('size'),
    color: formData.get('color'),
    imageURL: formData.get('imageURL')
  };

  try {
    const response = await fetch('/sellerAccountPage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
    });

    if (response.ok) {
      alert('Product added successfully');
      // Clear form or perform any other actions after successful submission
    } else {
      alert('Failed to add product');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred');
  }
});
