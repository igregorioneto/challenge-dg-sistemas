import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('product')
class Product {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    price: number;

}

export default Product;