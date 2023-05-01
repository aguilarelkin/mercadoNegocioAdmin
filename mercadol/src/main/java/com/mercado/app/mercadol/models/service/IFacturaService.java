package com.mercado.app.mercadol.models.service;

import com.mercado.app.mercadol.models.entity.Cliente;
import com.mercado.app.mercadol.models.entity.Factura;
import com.mercado.app.mercadol.models.entity.ItemFactura;

import java.util.List;
import java.util.Optional;

public interface IFacturaService {

    public List<Factura> fetchFacturaByIdWithClienteWhithItemFacturaWithProducto(Long id);

    public Factura saveFactura(Factura factura);


    public Cliente findByClienteId(Long id);

    public Optional<Factura> findFacturaId(Long id);

    public void deleteFactura(Long id);



}
