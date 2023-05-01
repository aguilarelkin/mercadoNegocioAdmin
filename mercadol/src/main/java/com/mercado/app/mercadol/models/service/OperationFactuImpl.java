package com.mercado.app.mercadol.models.service;

import com.mercado.app.mercadol.models.entity.Cliente;
import com.mercado.app.mercadol.models.entity.Factura;
import com.mercado.app.mercadol.models.entity.ItemFactura;
import com.mercado.app.mercadol.models.entity.Producto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OperationFactuImpl implements IOperationFacturaService {

    @Autowired
    private IFacturaService facturaService;
    @Autowired
    private IProductoService productoService;

    @Override
    public Integer operationCantidad(Integer cantidad, Integer cantItem, Integer cantReal, Integer cant) {
        if (cantidad >= 0 && cantItem > 0 && (cantidad <= cantReal)) {
            cant -= cantidad;
            if (cant < 0) {
                cant = 0;
            }
        } else if (cantidad < 0 && cantItem > 0) {
            Integer cantValid = cant + (cantidad * -1);
            if (cantValid <= cantReal) {
                cant = cant + (cantidad * -1);
            }
        }

        return cant;
    }

    @Override
    public Integer searchCantItem(Optional<Factura> facturaTwo, Long id) {
        Integer cant = null;
        for (int i = 0; i < facturaTwo.get().getItems().size(); i++) {

            if (facturaTwo.get().getItems().get(i).getProducto().getId().equals(id)) {

                cant = facturaTwo.get().getItems().get(i).getCantidad();

                break;
            }
        }
        return cant;
    }

    @Override
    public boolean updateFactura(Integer cantidad, Integer cant, Optional<Factura> facturaTwo, Long id, Integer cantItem, ItemFactura itemFactura, Optional<Producto> producto, Integer cantReal) {
        Boolean productExist = false;
        if (cantidad <= cant) {

            for (int i = 0; i < facturaTwo.get().getItems().size(); i++) {

                if (facturaTwo.get().getItems().get(i).getProducto().getId().equals(id)) {
                    Integer cantidadProducto = facturaTwo.get().getItems().get(i).getCantidad();

                    if (cantidad >= 0) {
                        cantidadProducto += cantidad;

                    } else if (cantidad < 0) {
                        Integer cantValid = cantidad * -1;
                        if (cantValid <= cantItem) {
                            cantidadProducto += cantidad;
                        } else {
                            return false;
                        }
                    }

                    facturaTwo.get().getItems().get(i).setCantidad(cantidadProducto);
                    productExist = true;
                    break;
                }
            }
            if (!productExist) {

                itemFactura.setCantidad(cantidad);
                itemFactura.setProducto(producto.get());

                facturaTwo.get().addItemFactura(itemFactura);//crear services for crete new item
            }

            if (cantItem == 0) {
                if (searchCantItem(facturaTwo, id) != null) {
                    cantItem = searchCantItem(facturaTwo, id);
                }
            }
            //     System.out.println(facturaTwo.get().getItems().get(0).getProducto().getId());

            facturaService.saveFactura(facturaTwo.get());

            System.out.println(cantItem);

            producto.get().setCantidad(operationCantidad(cantidad, cantItem, cantReal, cant));
            productoService.updateProduct(producto.get());
            System.out.println(cantItem);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public Boolean createFactura(Integer cant, Integer cantReal, Integer cantidad, Optional<Producto> producto, Factura factura, Integer cantItem) {
        cant = producto.get().getCantidad();
        cantReal = producto.get().getCantidadReal();

        ItemFactura itemFactura = new ItemFactura();

        if (cantidad <= cant) {
            itemFactura.setCantidad(cantidad);
            itemFactura.setProducto(producto.get());

            factura.addItemFactura(itemFactura);

            facturaService.saveFactura(factura);
            cantItem = cantidad;

            producto.get().setCantidad(operationCantidad(cantidad, cantItem, cantReal, cant));
            productoService.updateProduct(producto.get());
            System.out.println(cantItem);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean existClientFactura(Optional<Factura> facturaTwo, Long id, Integer cantItem, Optional<Producto> producto, Integer cant, Integer cantReal, Integer cantidad) {
        if (searchCantItem(facturaTwo, id) != null) {
            cantItem = searchCantItem(facturaTwo, id);
        }

        producto = productoService.findProduct(id);


        if (producto.get().getCantidad() > 0 || cantItem > 0) {

            cant = producto.get().getCantidad();
            cantReal = producto.get().getCantidadReal();

            ItemFactura itemFactura = new ItemFactura();
            Boolean productExist = false;

            System.out.println(cantidad <= cant);/////////////

            if (updateFactura(cantidad, cant, facturaTwo, id, cantItem, itemFactura, producto, cantReal)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    @Override
    public boolean factuNewCreate(Cliente facturaClient, Optional<Factura> facturaTwo, Long id, Integer cantItem, Optional<Producto> producto, Integer cant, Integer cantReal, Integer cantidad, Optional<Cliente> cliente, Factura factura) throws DataAccessException {
        if (facturaClient != null && facturaTwo != null) {

            try {

                if (existClientFactura(facturaTwo, id, cantItem, producto, cant, cantReal, cantidad)) {
                    return true;

                } else {
                    return false;
                }
            } catch (DataAccessException e) {
                return false;
            }
        } else if (facturaClient == null && !cliente.isEmpty()) {

            try {
                producto = productoService.findProduct(id);

                if (producto.get().getCantidad() > 0 || cantItem > 0) {

                    if (createFactura(cant, cantReal, cantidad, producto, factura, cantItem)) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } catch (DataAccessException e) {
                return false;
            }
        } else {
            return false;
        }
    }
}
