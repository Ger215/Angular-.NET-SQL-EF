using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BETarjeta.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BETarjeta
{
    [Route("api/[controller]")]
    [ApiController]
    public class TarjetaController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        
        public TarjetaController(ApplicationDbContext context)
        {
            _context = context;
        }
        
        // GET: api/Tarjeta
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listTarjeta = await _context.TarjetaCredito.ToListAsync();
                return Ok(listTarjeta);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST: api/Tarjeta
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] TarjetaCredito tarjeta)
        {
            try
            {
                _context.Add(tarjeta);
                await _context.SaveChangesAsync();
                return Ok(tarjeta);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT: api/Tarjeta/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] TarjetaCredito tarjeta)
        {
            try
            {
                if (id != tarjeta.Id)
                {
                    return NotFound();
                }

                _context.Update(tarjeta);
                await _context.SaveChangesAsync();
                return Ok(new { message = "La tarjeta fue actualizada con éxito" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE: api/Tarjeta/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var tarjeta = await _context.TarjetaCredito.FindAsync(id);
                if (tarjeta != null)
                {
                    _context.TarjetaCredito.Remove(tarjeta);
                    await _context.SaveChangesAsync();
                    return Ok(new { message = "La tarjeta fue eliminada con éxito" });
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
