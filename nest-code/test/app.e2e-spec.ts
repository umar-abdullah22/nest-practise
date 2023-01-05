import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { PrismaService } from 'prisma/prisma.service';
import * as pactum from 'pactum';
import { AuthDto } from 'auth/dto';
import { randomEmail } from 'random-email';
import { UserDto } from 'user/dto/user-dto';
import { CreateBookmarkDto, EditBookmarkDto } from 'bookmark/dto';
// import { AppModule } from 'src/app.module';
describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  //startign logic
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // only accept those parameters which are fdefined in clasas
      }),
    );
    await app.init();
    await app.listen(3004);
    pactum.request.setBaseUrl('http://localhost:3003');
    prisma = app.get(PrismaService);
    await prisma.cleanDb();
  });

  //tear down logic
  afterAll(() => {
    app.close();
  });
  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'umar786@test.com',
      password: '123',
    };
    describe('Signup', () => {
      it('should throw if email is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });
      it('should throw if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
      it('should throw if body not provided', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400);
      });
      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201); //.inspect() to see req logs
      });
    });
    describe('Login', () => {
      const dto: AuthDto = {
        email: 'umar2@test.com',
        password: '123',
      };
      let access_token: string;
      it('should throw if email is empty', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
      it('should throw if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
      it('should throw if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
      it('should login', () => {
        return (
          pactum
            .spec()
            .post('/auth/login')
            .withBody(dto)
            .expectStatus(200)
            // .inspect();
            .stores('userAT', 'access_token')
        );
      });
    });
  });
  describe('User', () => {
    describe('Get Me', () => {
      it('get current logged-in user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization: 'Bearer $S{userAT}',
          })
          .expectStatus(200)
          .inspect();
      });
    });
    describe('Edit User', () => {
      it('update user degtails', () => {
        const dto: UserDto = {
          // email: 'umarrr2@email.com',
          firstName: 'umar',
        };
        return pactum
          .spec()
          .patch('/users/4')
          .withHeaders({
            Authorization: 'Bearer $S{userAT}',
          })
          .withBody(dto)
          .expectStatus(200)
          .inspect();
      });
    });
    // describe('Delete User', () => {
    //   it('should delete user', () => {
    //     return pactum
    //       .spec()
    //       .delete('/users/4')
    //       .withHeaders({
    //         Authorization: 'Bearer $S{userAT}',
    //       })
    //       .expectStatus(200)
    //       .inspect();
    //   });
    // });
    // });
    describe('BookMark', () => {
      describe('Get EmptyBookmarks', () => {
        it('should get empty bookmarks', () => {
          return pactum
            .spec()
            .get('/bookmarks')
            .withHeaders({
              Authorization: 'Bearer $S{userAT}',
            })
            .expectStatus(200)
            .inspect();
        });
      });
      describe('Get bookmarkS', () => {
        it('should get bookmarks', () => {
          return pactum
            .spec()
            .get('/bookmarks')
            .withHeaders({
              Authorization: 'Bearer $S{userAT}',
            })

            .expectStatus(200)
            .inspect();
        });
      });
      describe('Create bookmarks', () => {
        const dto: CreateBookmarkDto = {
          title: 'lajhore and karachi',
          link: 'https://www.youtube.com/watch?v=GHTA143_b-s&t=4613s',
        };
        it('should create bookmarks', () => {
          return pactum
            .spec()
            .post('/bookmarks')
            .withHeaders({
              Authorization: 'Bearer $S{userAT}',
            })
            .withBody(dto)
            .expectStatus(201)
            .inspect()
            .stores('bookmarkId', 'id');
        });
      });
      describe('Get bookmark by id', () => {
        it('should get bookmark by id', () => {
          return pactum
            .spec()
            .get('/bookmarks/{id}')
            .withPathParams('id', '$S{bookmarkId}')
            .withHeaders({
              Authorization: 'Bearer $S{userAT}',
            })
            .expectStatus(200)
            .inspect();
          // .stores('bookmarId', 'id');
        });
      });
      describe('Edit bookmark by id', () => {
        const dto: EditBookmarkDto = {
          title: 'lahore lahore ay',
          description: 'free code camp nest tutorial',
        };
        it('should update bookmark by id', () => {
          // console.warn(dto.description);
          return pactum
            .spec()
            .patch('/bookmarks/{id}')
            .withPathParams('id', '$S{bookmarkId}')

            .withHeaders({
              Authorization: 'Bearer $S{userAT}',
            })
            .withBody(dto)
            .expectStatus(200)
            .expectBodyContains(dto.title)
            .expectBodyContains(dto.description)
            .inspect();

          //

          // .stores('bookmarId', 'id');
        });
      });
      describe('Delete bookmark by id', () => {
        it('should delete bookmark by id', () => {
          // console.warn(dto.description);
          return pactum
            .spec()
            .delete('/bookmarks/{id}')
            .withPathParams('id', '$S{bookmarkId}')
            .withHeaders({
              Authorization: 'Bearer $S{userAT}',
            })
            .expectStatus(204)
            .inspect();
        });
        it('should get empty bookmarks', () => {
          return pactum
            .spec()
            .get('/bookmarks')
            .withHeaders({
              Authorization: 'Bearer $S{userAT}',
            })

            .expectStatus(200)

            .inspect();
        });
      });
    });
  });
});
