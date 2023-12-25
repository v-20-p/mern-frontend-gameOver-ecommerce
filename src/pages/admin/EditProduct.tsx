import React ,{useState,useRef,useEffect} from 'react';

import { TypeCategories } from '../../redux/slices/products/categorySlice';
import { baseURL } from '../../api';
import { fetchProductItem, updateProduct } from '../../redux/slices/products/productsSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';

interface initialValue{
    description: string;
    discounts?: never[];
    image?: string;
    price: number;
    quantity?: number;
    shipping?: number;
    slug?: string;
    sold?: number;
    title: string;
    categoryId:TypeCategories[] |[]
    updatedAt?: string;
    _id?: string;
  }
interface EditProductFormProps {
  editProductForm: any;
  setEditProductForm :(value:React.SetStateAction<initialValue>) => void;
  setEditingProductId: (value: React.SetStateAction<string | null>) => void
  setIsEditing: (value: React.SetStateAction<boolean>) => void
  categories: TypeCategories[];
}






const EditProduct: React.FC<EditProductFormProps> = ({editProductForm,setEditProductForm,categories,setIsEditing,setEditingProductId}) => {
    
    const initialValue :initialValue = {
        _id: '',
        title: '',
        image: '',
        description: '',
        categoryId: [],
        // variants: [],
        // sizes: [],
        price: 0,
        quantity:10,
        discounts:[]
        // rate: 0,
        // cart_Id: 0
      }
      const [imagePreview, setImagePreview] = useState<string | null>(null);
      const dispatch = useDispatch<AppDispatch>()
      useEffect(() => {
   
        dispatch(fetchProductItem({page:0,filter:''}))
    
      }, [dispatch])

    const onChangeHandleEditItem = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement >
      ) => {
        const { name, value ,} = e.target
        const isList = name === 'categoryId' || name === 'variants' || name === 'sizes'
        const isImage= name=== 'image'
    
        if (!isList && !isImage) {
          setEditProductForm({
            ...editProductForm,
            [name]: value
          })
    
        } 
      }
      console.log(editProductForm)

      const handleSaveEdit = () => {
        dispatch(updateProduct({ id: editProductForm._id, data: {
            title:editProductForm.title,
            price:editProductForm.price,
            description:editProductForm.description,
            categoryId:editProductForm.categoryId,
            quantity:editProductForm.quantity,
            shipping:editProductForm.shipping,
            image:editProductForm.image
        } }));
        setEditProductForm(initialValue);
        setIsEditing(false);
        setEditingProductId(null);
      };
      const handleCancelEdit = () => {
        setEditProductForm(initialValue);
        setIsEditing(false); 
        setEditingProductId(null);
      };

      const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev)
  }

  const closeDropdown = () => {
    setIsDropdownOpen(false)
  }


  const titleOfcategory = (categoryIds: string[]) => {
    const titles = categories.filter((cat) => categoryIds.includes(cat._id)).map((cat) => cat.title)
    console.log(titles)
    return titles.join(' , ')
  }
  const onRemoveHandleItem = (categoryId: string) => {
    setEditProductForm((productForm: any) => ({
      ...productForm,
      categoryId: productForm.categoryId.filter((id: string) => id !== categoryId)
    }))
  }
  const onChangeListHandleItem = (categoryId: string) => {
    setEditProductForm((productForm: any) => ({
      ...productForm,
      categoryId: [...productForm.categoryId, categoryId]
    }))
  }
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setEditProductForm((productForm: any) => ({
        ...productForm,
        image: file,
      }));

      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
    }
  };


  return (
    <div className="edit-form">
      {/* <h3>Edit Product</h3> */}
      <form>
       
        <label htmlFor="editTitle">Title:</label>
        <input
          type="text"
          id="editTitle"
          name="title"
          value={editProductForm.title}
          onChange={onChangeHandleEditItem}
        />

        
        <label htmlFor="editPrice">Price:</label>
        <input
          type="text"
          id="editPrice"
          name="price"
          value={editProductForm.price}
          onChange={onChangeHandleEditItem}
        />
        <label htmlFor="">quantity</label>
          <input
            type="text"
            name="quantity"
     
            value={editProductForm.quantity}
            onChange={onChangeHandleEditItem}
          />
        <div className="custom-dropdown" onBlur={closeDropdown} tabIndex={0} ref={dropdownRef}>
            <label htmlFor="categories">Categories</label>
            <div
              className={`dropdown-trigger ${isDropdownOpen ? 'open' : ''}`}
              onClick={toggleDropdown}>
              {editProductForm.categoryId.length > 0
                ? titleOfcategory((editProductForm.categoryId as string []))
                : 'Select Categories'}
            </div>
            {isDropdownOpen && (
              <div className="dropdown-content">
                {categories.map((category) => (
                  <div
                    key={category._id}
                    className={`dropdown-option ${
                        editProductForm.categoryId.includes(category._id as never) ? 'selected' : ''
                    }`}
                    onClick={() =>
                        editProductForm.categoryId.includes(category._id as never)
                        ? onRemoveHandleItem(category._id)
                        : onChangeListHandleItem(category._id)
                    }>
                    {category.title}
                  </div>
                ))}
              </div>
            )}
          </div>


    
        <label htmlFor="editDescription">Description:</label>
        <textarea
          id="editDescription"
          name="description"
          value={editProductForm.description}
          onChange={onChangeHandleEditItem}
        />
        <label htmlFor="">image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          <br />

        <button type="button" onClick={handleSaveEdit}>
          Save
        </button>
        <button type="button" onClick={handleCancelEdit}>
          Cancel
        </button>
      </form>
      {imagePreview ? <img src={imagePreview} alt={editProductForm.title} />:<img src={editProductForm.image} alt={editProductForm.title} /> }
     
    </div>
  );
};

export default EditProduct;
