using FluentAssertions;
using LearnTogether.Application.Services;
using LearnTogether.Core.Entities;
using LearnTogether.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace LearnTogether.Tests;

[TestFixture]
public class PostRepositoryTests
{
    private DbContextOptions<ApplicationDbContext> dbContextOptions;
    private Post post1;
    private Post post2;
    private ApplicationDbContext context;

    [SetUp]
    public void SetUp()
    {
        dbContextOptions = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDatabase")
            .Options;

        context = new ApplicationDbContext(dbContextOptions);
        var user1 = new User();
        user1.Id = Guid.Parse("12345678-90ab-cdef-7777-567890abcccc");
        user1.Description = "dsds";
        user1.UserName = "AAA";
        user1.Rating = 3;
        user1.FullName = "sdsd";
        user1.PasswordHash = "23232";
        
        var user2 = new User();
        user2.Id = Guid.Parse("12345678-90ab-cdef-2222-567890abcccc");
        user2.Description = "dsds";
        user2.UserName = "AAA";
        user2.Rating = 5;
        user2.FullName = "sdsd";
        user2.PasswordHash = "23232";

        post1 = new Post
        {
            Id = Guid.Parse("12345678-90ab-cdef-2222-567890abcdef"),
            UserId = user1.Id,
            RequiredSubject = Subject.Math,
            Tags = new List<string> { "Okulovskiy" },
            Description = "Я добряк",
            HelpSubjects = new[] { Subject.Algorithms },
            User = user1
        };

        post2 = new Post
        {
            Id = Guid.Parse("12345678-90ab-cdef-1234-567890abcdef"),
            UserId = user2.Id,
            RequiredSubject = Subject.CiSharp,
            Tags = new List<string> { "zzz", "vvv" },
            Description = "Я еще больший добряк",
            HelpSubjects = new[] { Subject.Math },
            User = user2
        };

        context.Database.EnsureDeleted();
        context.Database.EnsureCreated();
        
        context.Posts.AddRange(post1, post2);
        context.SaveChanges();
    }
    
    [TearDown]
    public void TearDown()
    {
        context.Dispose();
    }

    [Test]
    public async Task Test_FilteringWithInMemoryDb()
    {
        var requiredSubject = Subject.Math;
        var helpSubjects = new[] { Subject.CiSharp };
        var minRating = 3;
        var postRepository = new PostRepository(context);
        var expectedResult = Guid.Parse("12345678-90ab-cdef-1234-567890abcdef");

        var result = await postRepository.GetFilteredPostsAsync(requiredSubject, helpSubjects, minRating, 
            SortType.Old);
        
        result.Should().ContainSingle();
        result[0].Id.Should().Be(expectedResult);
    }
    
    [Test]
    public async Task Test_FilteringBigRating()
    {
        var requiredSubject = Subject.Math;
        var helpSubjects = new[] { Subject.CiSharp };
        var minRating = 100;
        var postRepository = new PostRepository(context);

        var result = await postRepository.GetFilteredPostsAsync(requiredSubject, helpSubjects, minRating, 
            SortType.Old);
        
        result.Should().HaveCount(0);
    }
    
    [Test]
    public async Task Test_FilteringFromOldToNew()
    {
        var postRepository = new PostRepository(context);
        
        var result = await postRepository.GetFilteredPostsAsync(null, 
            Array.Empty<Subject>(), null, SortType.Old);
        
        result.Should().HaveCount(2);
        result.Should().BeInAscendingOrder(post => post.DateCreated);
    }
    
    [Test]
    public async Task Test_FilteringFromNewToOld()
    {
        var postRepository = new PostRepository(context);
    
        var result = await postRepository.GetFilteredPostsAsync(null, 
            Array.Empty<Subject>(), null, SortType.New);
    
        result.Should().HaveCount(2);
        result.Should().BeInDescendingOrder(post => post.DateCreated);
    }
    
    [Test]
    public async Task Test_FilteringFromMinToMaxRating()
    {
        var postRepository = new PostRepository(context);
        var result = await postRepository.GetFilteredPostsAsync(null, 
            Array.Empty<Subject>(), null, SortType.RatingMinToMax);
    
        result.Should().HaveCount(2);
        result.Should().BeInAscendingOrder(post => post.Rating);
    }
    
    [Test]
    public async Task Test_FilteringFromMaxToMinRating()
    {
        var postRepository = new PostRepository(context);
   
        var result = await postRepository.GetFilteredPostsAsync(null, 
            Array.Empty<Subject>(), null, SortType.RatingMaxToMin);
    
        result.Should().HaveCount(2);
        result.Should().BeInDescendingOrder(post => post.Rating);
    }
    
    [Test]
    public async Task TestGetPostById()
    {
        var postRepository = new PostRepository(context);
        var expectedResult = Guid.Parse("12345678-90ab-cdef-1234-567890abcdef");
    
        var result = await postRepository.GetByIdAsync(expectedResult);
    
        result.Should().BeEquivalentTo(post2);
    }
    
    [Test]
    public async Task TestNoPostByIdReturnsNull()
    {
        var postRepository = new PostRepository(context);
        var expectedResult = Guid.Parse("12341337-90ab-cdef-1234-567890abcdef");
        
        var result = await postRepository.GetByIdAsync(expectedResult);
        
        result.Should().BeNull();
    }
    
    [Test]
    public async Task TestAddAsyncCorrect()
    {
        var requiredSubject = Subject.Math;
        var helpSubjects = new[] { Subject.CiSharp };
        var minRating = 2;

        var user3 = new User();
        user3.Id = Guid.Parse("12345678-90ab-cdef-7777-567890abcccc");
        user3.Description = "dsds";
        user3.UserName = "AAA";
        user3.Rating = 3;
        user3.FullName = "sdsd";
        user3.PasswordHash = "23232";
        
        var post = new Post
        {
            Id = Guid.Parse("12345678-90ab-cdef-3333-567890abcdef"),
            UserId = user3.Id,
            RequiredSubject = Subject.Math,
            Tags = new List<string> { "Okulovskiy" },
            Description = "Я cлоняра",
            HelpSubjects = new[] { Subject.Algorithms },
            User = user3
        };
        var postRepository = new PostRepository(context);
        postRepository.GetByIdAsync(post.Id).Result.Should().BeNull();
        await postRepository.AddAsync(post);
        postRepository.GetByIdAsync(post.Id).Result.Should().BeEquivalentTo(post);
    }
    
    [Test]
    public async Task TestDeleteCorrect()
    { 
        var postRepository = new PostRepository(context);
        await postRepository.DeleteAsync(post1.Id);
        postRepository.GetByIdAsync(post1.Id).Result.Should().BeNull();
    }
}
