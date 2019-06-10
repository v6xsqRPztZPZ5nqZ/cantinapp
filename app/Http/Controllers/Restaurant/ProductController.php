<?php

namespace App\Http\Controllers\Restaurant;

use App\Http\Requests\ProductStoreRequest;
use App\Model\Product;
use App\Model\Taxonomy;
use App\Repositories\TaxonomyRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class ProductController extends Controller
{
    public function index(): View
    {
        $products = Product::all();

        return view('restaurant.product.index', ['products' => $products]);
    }

    public function create(): View
    {
        return view('restaurant.product.create', [
            'product' => new Product(),
            'categories' => Taxonomy\Category::all()
        ]);
    }

    public function store(ProductStoreRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $this->uploadImage($data);
        /** @var $product Product */
        $product = Product::create($data);
        $product->attachTags(json_decode($data['tags'], true));
        $request->session()->flash('success', 'The action was completed successfully.');

        return redirect()->route('restaurant.product.index');
    }

    public function edit($id): View
    {
        $product = Product::findOrFail($id);
        return view('restaurant.product.create', [
            'product' => $product,
            'categories' => Taxonomy\Category::all()
        ]);
    }

    public function update(ProductStoreRequest $request, Product $product): RedirectResponse
    {
        $data = $request->validated();
        $this->uploadImage($data);
        $product->update($data);
        $product->attachTags(json_decode($data['tags'], true));
        $request->session()->flash('success', 'The action was completed successfully.');

        return redirect()->route('restaurant.product.index');
    }

    public function destroy(Request $request, int $id): RedirectResponse
    {
        $product = Product::findOrFail($id);
        $product->delete();
        $request->session()->flash('success', 'The action was completed successfully.');

        return redirect()->route('restaurant.product.index');
    }

    public function changeStatus(Request $request, string $state, Product $product): RedirectResponse
    {
        $product->status = $state;
        $product->save();
        $request->session()->flash('success', "Status changed successfully to {$product->name}");

        return redirect()->route('restaurant.product.index');
    }
}
