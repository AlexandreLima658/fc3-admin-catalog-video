import { Category } from "../category.entity"

describe('Category Unit Tests', () => {
    
    describe('constructor', () => {
        
        test("should create category with name",() => {
            
            const category = new Category({
                name: 'Movie'
            })

            expect(category.categoryId).toBeUndefined();
            expect(category.name).toBe('Movie');
            expect(category.isActive).toBeTruthy();
        
        })
        
        test("should create category with all values", () => {
            const createdAt = new Date();

            const category = new Category({
              name: 'Movie',
              description: 'Movie description',
              isActive: false,
              createdAt
            })

            expect(category.categoryId).toBeUndefined();
            expect(category.name).toBe('Movie');
            expect(category.description).toBe('Movie description')
            expect(category.isActive).toBeFalsy();
            expect(category.createdAt).toBe(createdAt);
        })
        
    });


})