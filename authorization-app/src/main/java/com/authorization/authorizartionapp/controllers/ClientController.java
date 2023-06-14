package com.authorization.authorizartionapp.controllers;

/*@RestController
@RequestMapping("/client")*/
public class ClientController {
/*

    @Autowired
    private ClientServiceImpl clientService;

    @PostMapping("/create")
    public ResponseEntity<?> createClient(@Valid @RequestBody Client cliente, BindingResult result) {
        Map<String, Object> response = new HashMap<>();

        try {
            clientService.create(cliente);

            response.put("mensaje", "El cliente ha sido creado con éxito!");
            response.put("cliente", cliente);


        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar el insert en la base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

       */
/* Map<String, Object> response = new HashMap<>();
        response.put("mensaje", "El producto ha sido creado con éxito!");*//*

        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
    }
*/


}
