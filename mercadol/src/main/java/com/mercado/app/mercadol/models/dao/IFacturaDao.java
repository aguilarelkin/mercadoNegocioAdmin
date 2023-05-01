package com.mercado.app.mercadol.models.dao;

import com.mercado.app.mercadol.models.entity.Cliente;
import com.mercado.app.mercadol.models.entity.Factura;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface IFacturaDao extends CrudRepository<Factura, Long>{

	//@Query("select f from Factura f join fetch f.cliente c join fetch f.items l join fetch l.producto where f.id=?1")
	@Query("select f from Factura f where f.id=?1")
	public List<Factura> fetchByIdWithClienteWhithItemFacturaWithProducto(Long id);

//	@Query("select f from Factura f where f.cliente=?1")
//	public Factura findByCliente(Long cliente);



}
