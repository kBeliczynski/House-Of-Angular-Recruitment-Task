import {ComponentFixture, TestBed} from "@angular/core/testing";
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from "@angular/platform-browser-dynamic/testing";
import {Component} from "@angular/core";
import {FilterPipe} from "./filter.pipe";
import {Recipe} from "./recipe.model";


// TestBed.initTestEnvironment(
//   BrowserDynamicTestingModule,
//   platformBrowserDynamicTesting()
// )

describe('FilterPipe', ()=>{

  describe('Isolated FlterPipeTests', () => {
    const pipe = new FilterPipe();
    const recipes : Recipe[] =[
    {
      _id: '614ef6d6dc46c203e8b3deda',
      name: 'name1',
      preparationTimeInMinutes: 10,
      description: 'testtesttesttesttesttesttest',
      ingredients: [
        {
          name: 'i1',
          quantity: 1
        },
        {
          name: 'i2',
          quantity: 2
        }
      ]
    },
    {
      _id: '614ef6fbdc46c203e8b3dedb',
      name: 'name2',
      preparationTimeInMinutes: 20,
      description: 'testestestestesetestesteset',
      ingredients: [
        {
          name: 'i1',
          quantity: 3
        },
        {
          name: 'i2',
          quantity: 4
        }
      ]
    },
    {
      _id: '614ef763dc46c203e8b3dedc',
      name: 'test1',
      preparationTimeInMinutes: 30,
      description: 'testestestestestesetsettestestestestestes',
      ingredients: [
        {
          name: 'i2',
          quantity: 4
        },
        {
          name: 'i4',
          quantity: 3
        }
      ]
    }
  ];

    it('Should return all values if input string is empty', () => {
      const InputName = '';
      expect(pipe.transform(recipes,InputName,'name')).toEqual(recipes);
    });

    it('Should return all values cointain name like "name"', () => {
      const expectedRecipes: Recipe[] = [
        {
          _id: '614ef6d6dc46c203e8b3deda',
          name: 'name1',
          preparationTimeInMinutes: 10,
          description: 'testtesttesttesttesttesttest',
          ingredients: [
            {
              name: 'i1',
              quantity: 1
            },
            {
              name: 'i2',
              quantity: 2
            }
          ]
        },
        {
          _id: '614ef6fbdc46c203e8b3dedb',
          name: 'name2',
          preparationTimeInMinutes: 20,
          description: 'testestestestesetestesteset',
          ingredients: [
            {
              name: 'i1',
              quantity: 3
            },
            {
              name: 'i2',
              quantity: 4
            }
          ]
        }
    ]
      const InputName = 'name';
      expect(pipe.transform(recipes,InputName,'name')).toEqual(expectedRecipes);
    });

    it('Should return all values contain name like "1"', () => {
      const expectedRecipes: Recipe[] = [
        {
          _id: '614ef6d6dc46c203e8b3deda',
          name: 'name1',
          preparationTimeInMinutes: 10,
          description: 'testtesttesttesttesttesttest',
          ingredients: [
            {
              name: 'i1',
              quantity: 1
            },
            {
              name: 'i2',
              quantity: 2
            }
          ]
        },
        {
          _id: '614ef763dc46c203e8b3dedc',
          name: 'test1',
          preparationTimeInMinutes: 30,
          description: 'testestestestestesetsettestestestestestes',
          ingredients: [
            {
              name: 'i2',
              quantity: 4
            },
            {
              name: 'i4',
              quantity: 3
            }
          ]
        }
    ];
      const InputName = '1';
      expect(pipe.transform(recipes,InputName,'name')).toEqual(expectedRecipes);
    });

        it('Should return all values contain name like "name1a"', () => {
      const expectedRecipes: Recipe[] = [];
      const InputName = 'name1a';
      expect(pipe.transform(recipes,InputName,'name')).toEqual(expectedRecipes);
    });

    it('Should return all values contain name like "test1"', () => {
      const expectedRecipes: Recipe[] = [
        {
          _id: '614ef763dc46c203e8b3dedc',
          name: 'test1',
          preparationTimeInMinutes: 30,
          description: 'testestestestestesetsettestestestestestes',
          ingredients: [
            {
              name: 'i2',
              quantity: 4
            },
            {
              name: 'i4',
              quantity: 3
            }
          ]
        }
    ];
      const InputName = 'test1';
      expect(pipe.transform(recipes,InputName,'name')).toEqual(expectedRecipes);
    });

  })
})
