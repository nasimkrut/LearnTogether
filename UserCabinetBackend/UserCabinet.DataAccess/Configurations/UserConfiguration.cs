using UserCabinet.Core.Models;
using UserCabinet.DataAccess.Entites;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace UserCabinet.DataAccess.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<UserEntity>
{
    public void Configure(EntityTypeBuilder<UserEntity> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(b => b.Name)
            .HasMaxLength(User.MaxNameLength)
            .IsRequired();

        builder.Property(b => b.Email)
            .IsRequired();
        
        builder.Property(b => b.Password)
            .IsRequired();
        
        builder.Property(b => b.AvatarUrl)
            .IsRequired();
        
        builder.Property(b => b.Rating)
            .IsRequired();
        
        builder.Property(b => b.Role)
            .IsRequired();
    }
}