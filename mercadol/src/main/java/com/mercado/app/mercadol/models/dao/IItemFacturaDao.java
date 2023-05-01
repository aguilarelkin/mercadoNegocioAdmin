package com.mercado.app.mercadol.models.dao;

import com.mercado.app.mercadol.models.entity.ItemFactura;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IItemFacturaDao extends JpaRepository<ItemFactura,Long> {
}
