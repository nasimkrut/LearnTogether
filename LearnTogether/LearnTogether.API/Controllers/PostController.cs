using LearnTogether.Core.Entities;
using LearnTogether.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace LearnTogether.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PostController : ControllerBase
{
    private readonly IPostService _postService;

    public PostController(IPostService postService)
    {
        _postService = postService;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Post>> GetPostByIdAsync(Guid id)
    {
        var post = await _postService.GetPostByIdAsync(id);
        if (post == null)
        {
            return NotFound();
        }

        return post;
    }

    [HttpGet("getAllPosts")]
    public async Task<ActionResult<List<Post>>> GetAllPostAsync()
    {
        var posts = await _postService.GetAllPostAsync();
        return posts;
    }


    [HttpGet("filtered")]
    public async Task<ActionResult<List<Post>>> GetFilteredPostsAsync(
        [FromQuery] Subject? requiredSubject,
        [FromQuery] Subject[] helpSubjects,
        [FromQuery] double? minRating,
        [FromQuery] SortType sortBy)
    {
        var posts = await _postService.GetFilteredPostsAsync(requiredSubject, helpSubjects, minRating, sortBy);
        return Ok(posts);
    }

    [HttpPost("AddPost")]
    public async Task<ActionResult<Guid>> AddPostAsync([FromBody] PostDto postDto)
    {
        var post = new Post
        {
            UserId = postDto.UserId,
            RequiredSubject = postDto.RequiredSubject,
            HelpSubjects = postDto.HelpSubjects,
            Description = postDto.Description,
            Tags = postDto.Tags,
            DateCreated = DateTimeOffset.UtcNow
        };

        await _postService.AddPostAsync(post);
        return StatusCode(StatusCodes.Status201Created, post.Id);
    }
}