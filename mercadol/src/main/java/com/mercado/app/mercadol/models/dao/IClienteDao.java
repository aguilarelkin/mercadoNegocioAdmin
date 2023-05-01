package com.mercado.app.mercadol.models.dao;

import com.mercado.app.mercadol.models.entity.Cliente;
import com.mercado.app.mercadol.models.entity.Factura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface IClienteDao extends JpaRepository<Cliente,Long> {

    public Cliente findByEmail(String email);

    @Query("select c from Cliente c join fetch c.facturas f  where c.id=?1")
    public Cliente fetchByIdWithFactura(Long id);

}
