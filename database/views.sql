--all_order_details
SELECT od.order_id,
    od.customer_id,
    od.order_date,
    od.delivery_method,
    od.order_status_id,
    od.comments,
    od.dispatched_date,
    od.payment_method_id,
    os.name AS status,
    pm.name AS payment,
    json_agg(json_build_object('productId', oi.product_id, 'variantName', oi.product_variant, 'quantity', oi.quantity, 'unitPrice', oi.unit_price, 'product', p.title)) AS items
   FROM order_details od
     JOIN order_status os USING (order_status_id)
     JOIN payment_method pm USING (payment_method_id)
     JOIN order_item oi USING (order_id)
     JOIN product p USING (product_id)
  GROUP BY od.order_id, os.name, pm.name;
-----------------------------------------------------------------------------------------------------------------------
  --get_product_all_details
  SELECT p.product_id,
    p.title,
    p.description,
    p.weight,
    p.sku,
    p.deleted,
    ( SELECT COALESCE(json_agg(json_build_object('rating', pr.rating, 'description', pr.description)) FILTER (WHERE pr.rating IS NOT NULL), '[]'::json) AS reviews
           FROM product
             LEFT JOIN product_review pr USING (product_id)
             LEFT JOIN customer USING (customer_id)
          WHERE product.product_id = p.product_id
          GROUP BY product.product_id) AS reviews,
    ( SELECT json_agg(product_category.category_id) AS json_agg
           FROM product
             LEFT JOIN product_category USING (product_id)
          WHERE product.product_id = p.product_id
          GROUP BY product.product_id) AS categories,
    ( SELECT json_agg(json_build_object('name', product_variant.variant_name, 'unitPrice', product_variant.unit_price, 'countInStock', product_variant.count_in_stock)) AS json_agg
           FROM product
             LEFT JOIN product_variant USING (product_id)
          WHERE product.product_id = p.product_id
          GROUP BY product.product_id) AS variants
   FROM product p;