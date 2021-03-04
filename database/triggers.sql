--trigger function 1
--get_current_stock
BEGIN
     UPDATE product_variant SET count_in_stock=count_in_stock-new.quantity
     WHERE product_id=NEW.product_id AND variant_name=NEW.product_variant;
	RETURN NEW;
END;
---------------------------------------------------------------------------------
--trigger
--get_stock
AFTER INSERT ON order_item

--trigger function 2
--get_total
BEGIN
    UPDATE order_item SET unit_price=NEW.quantity*NEW.unit_price
    WHERE product_id=NEW.product_id AND order_id=NEW.order_id;
    RETURN NEW;
END;

--trigger
--get_total
AFTER INSERT ON order_item