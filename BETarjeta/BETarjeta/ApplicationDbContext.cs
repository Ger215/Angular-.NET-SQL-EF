using BETarjeta.Models;
using Microsoft.EntityFrameworkCore;

namespace BETarjeta;

public class ApplicationDbContext : DbContext
{
    public DbSet<TarjetaCredito> TarjetaCredito {get; set;}
    
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
        
    }
}