using LearnTogether.Application.Services;
using LearnTogether.Core.Entities;
using LearnTogether.Infrastructure;
using Microsoft.EntityFrameworkCore;
// using Moq;

namespace LearnTogether.Tests;

[TestFixture]
public class PostRepositoryTests
{
    private DbContextOptions<ApplicationDbContext> _dbContextOptions;
    private ApplicationDbContext _context;

    [SetUp]
    public void SetUp()
    {
        // Настройка In-Memory базы данных
        _dbContextOptions = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDatabase")
            .Options;

        _context = new ApplicationDbContext(_dbContextOptions);

        // Добавляем тестовые данные в базу
        _context.Posts.AddRange(new Post
            {
                Id = Guid.NewGuid(),
                RequiredSubject = Subject.Math,
                Tags = new List<string>{"zzz", "zzz"},
                Description = "ZЯ",
                Rating = 5,
                HelpSubjects = new[] { Subject.Algorithms }
            },
            new Post
            {
                Id = Guid.NewGuid(),
                RequiredSubject = Subject.CiSharp,
                Tags = new List<string>{"zzz", "zzz"},
                Description = "ZЯ",
                Rating = 3,
                HelpSubjects = new[] { Subject.Algorithms }
            });
        _context.SaveChanges();
    }
    
    [TearDown]
    public void TearDown()
    {
        // Dispose of the context to release resources after each test
        _context.Dispose();
    }

    [Test]
    public async Task Test_FilteringWithInMemoryDb()
    {
        // Arrange
        var requiredSubject = Subject.Math;
        var helpSubjects = new[] { Subject.Algorithms };
        var minRating = 4;
        var postRepository = new PostRepository(_context);

        // Act
        var result = await postRepository.GetFilteredPostsAsync(requiredSubject, helpSubjects, 3, 
            SortType.RatingMinToMax);

        // // Assert
        // Assert.AreEqual(1, result.Count);  // Ожидаем, что останется 1 пост
        // Assert.AreEqual("Math", result[0].RequiredSubject);
        // Assert.AreEqual(5, result[0].Rating);
        // result.Should().HaveCount(0);
    }
    
    

    
    
    // [Test]
    // public async Task GetAllPostAsync_ReturnsAllPosts()
    // {
    //     // Arrange
    //     var posts = new List<Post>
    //     {
    //         new Post { Id = Guid.NewGuid(), Description = "Post 1" },
    //         new Post { Id = Guid.NewGuid(), Description = "Post 2" }
    //     };
    //     _mockPostService.Setup(service => service.GetAllPostAsync())
    //         .ReturnsAsync(posts);
    //
    //     // Act
    //     var result = await _controller.GetAllPostAsync();
    //
    //     // Assert
    //     result.Should().BeOfType<ActionResult<List<Post>>>();
    //     var okResult = result.Result as OkObjectResult;
    //     okResult.Should().NotBeNull();
    //     okResult.Value.Should().BeEquivalentTo(posts);
    // }

    // public async Task GetPostByIdAsync_ShouldReturnNotFound_WhenPostDoesNotExist()
    // {
    //     // Arrange
    //     var postId = Guid.NewGuid();
    //
    //     _mockPostService
    //         .Setup(service => service.GetPostByIdAsync(postId))
    //         .ReturnsAsync((Post)null);
    //
    //     // Act
    //     var result = await _postController.GetPostByIdAsync(postId);
    //
    //     // Assert
    //     result.Result.Should().BeOfType<NotFoundResult>();
    // }d
}
