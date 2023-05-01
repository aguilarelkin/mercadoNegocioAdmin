package com.mercado.app.mercadol.models.service;

import com.mercado.app.mercadol.models.entity.Cliente;
import com.mercado.app.mercadol.models.entity.Factura;
import com.mercado.app.mercadol.models.entity.ItemFactura;
import com.mercado.app.mercadol.models.entity.Producto;
import org.springframework.dao.DataAccessException;

import java.util.Optional;

public interface IOperationFacturaService {
    public Integer operationCantidad(Integer cantidad, Integer cantItem, Integer cantReal, Integer cant);

    public Integer searchCantItem(Optional<Factura> facturaTwo, Long id);

    public boolean updateFactura(Integer cantidad, Integer cant, Optional<Factura> facturaTwo, Long id, Integer cantItem, ItemFactura itemFactura, Optional<Producto> producto, Integer cantReal);

    public Boolean createFactura(Integer cant, Integer cantReal, Integer cantidad, Optional<Producto> producto, Factura factura, Integer cantItem);

    public boolean existClientFactura(Optional<Factura> facturaTwo, Long id, Integer cantItem, Optional<Producto> producto, Integer cant, Integer cantReal, Integer cantidad);

    public boolean factuNewCreate(Cliente facturaClient, Optional<Factura> facturaTwo, Long id, Integer cantItem, Optional<Producto> producto, Integer cant, Integer cantReal, Integer cantidad, Optional<Cliente> cliente, Factura factura) throws DataAccessException;
}
