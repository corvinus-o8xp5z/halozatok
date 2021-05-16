﻿using HajosTeszt.JokeModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HajosTeszt.Controllers
{
    public class JokeController : Controller
    {
        [Route("api/jokes")]
        [ApiController]
        public class JokeController : ControllerBase
        {
            // GET: api/<JokeController>
            [HttpGet]
            public IEnumerable<JokeModels. Joke> Get()
            {
                FunnyDatabaseContext context = new FunnyDatabaseContext();
                return context.Jokes.ToList(); //az IEnumerable után a<>-ben nem biztos, hogy JokeModels.Joke van
            }

            // GET api/jokes/5
            [HttpGet("{id}")]
            public string Get(int id)
            {
                return "value";
            }

            // POST api/jokes
            //[HttpPost]
            /*public void Post([FromBody] Joke newjoke)
            {
                FunnyDatabaseContext context = new FunnyDatabaseContext();
                context.Jokes.Add(newjoke);
                context.SaveChanges();
            }*/

            // PUT api/<JokeController>/5
            [HttpPut("{id}")]
            public void Put(int id, [FromBody] string value)
            {
            }

            // DELETE api/<JokeController>/5
            [HttpDelete("{id}")]
            public void Delete(int id)
            {
            }

            [HttpGet("{id}")]
            public Joke GetJoke(int id)
            {
                FunnyDatabaseContext context = new FunnyDatabaseContext();
                var keresettVicc = (from x in context.Jokes
                                    where x.JokeSk == id
                                    select x).FirstOrDefault();
                return keresettVicc;
            }

            // POST api/jokes
            [HttpPost]
            public void Post([FromBody] Joke újVicc)
            {
                FunnyDatabaseContext context = new FunnyDatabaseContext();
                context.Jokes.Add(újVicc);
                context.SaveChanges();
            }

            // DELETE api/jokes/5
            [HttpDelete("{id}")]
            public void DeleteJoke(int id)
            {
                FunnyDatabaseContext context = new FunnyDatabaseContext();
                var törlendőVicc = (from x in context.Jokes
                                    where x.JokeSk == id
                                    select x).FirstOrDefault();
                context.Remove(törlendőVicc);
                context.SaveChanges();
            }
        }
    }

}
