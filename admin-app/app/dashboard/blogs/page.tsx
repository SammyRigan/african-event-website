"use client"

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Plus, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { deleteBlogPost } from '@/lib/firebaseService';
import AdminLayout from '../../../components/AdminLayout';
import EditBlogModal from '../../blogs/edit/EditBlogModal';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  image: string;
  order?: number;
  isActive?: boolean;
  timestamp: any;
}

export default function BlogsPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsQuery = query(
          collection(db, 'blog-posts'),
          orderBy('date', 'desc')
        );
        const blogsSnapshot = await getDocs(blogsQuery);
        const blogsData = blogsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as BlogPost[];

        setBlogPosts(blogsData);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-gray-800">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout
      participants={[]}
      exhibitors={[]}
      contacts={[]}
      partnerships={[]}
      speakers={[]}
      galleryImages={[]}
      blogPosts={blogPosts}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      showExport={false}
      title="Blogs"
    >
      <div className="space-y-6">
        {/* Add Blog Button */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            {filteredBlogPosts.length} blog post{filteredBlogPosts.length !== 1 ? 's' : ''}
          </p>
          <div className="flex gap-2">
            <Link href="/blogs/add">
              <Button className="bg-[#E19D2B] hover:bg-[#D18A1A]">
                <Plus className="w-4 h-4 mr-2" />
                Add Blog Post
              </Button>
            </Link>
          </div>
        </div>

        {/* Blog Posts List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBlogPosts.map((post) => (
            <Card key={post.id}>
              <CardContent className="p-0">
                <div className="relative aspect-video">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant={(post.isActive ?? true) ? 'default' : 'secondary'} className="text-xs">
                      {(post.isActive ?? true) ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge variant="outline" className="text-xs bg-black/50 text-white border-white/30">
                      {post.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span>{post.author}</span>
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 w-full hover:bg-blue-50"
                      onClick={() => {
                        setEditingBlogId(post.id);
                        setIsEditModalOpen(true);
                      }}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:bg-red-50"
                      onClick={async () => {
                        if (confirm('Are you sure you want to delete this blog post?')) {
                          try {
                            await deleteBlogPost(post.id);
                            setBlogPosts(blogPosts.filter(p => p.id !== post.id));
                          } catch (error) {
                            console.error('Error deleting blog post:', error);
                            alert('Failed to delete blog post');
                          }
                        }
                      }}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {filteredBlogPosts.length === 0 && (
            <Card className="col-span-full">
              <CardContent className="p-12 text-center">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">
                  {searchTerm ? 'No blog posts match your search' : 'No blog posts yet'}
                </p>
                {!searchTerm && (
                  <Link href="/blogs/add">
                    <Button className="bg-[#E19D2B] hover:bg-[#D18A1A]">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Your First Blog Post
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <EditBlogModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        blogId={editingBlogId}
        onSuccess={() => {
          // Refetch blog posts after successful edit
          const fetchBlogs = async () => {
            try {
              const blogsQuery = query(
                collection(db, 'blog-posts'),
                orderBy('date', 'desc')
              );
              const blogsSnapshot = await getDocs(blogsQuery);
              const blogsData = blogsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              })) as BlogPost[];

              setBlogPosts(blogsData);
            } catch (error) {
              console.error('Error fetching blog posts:', error);
            }
          };
          fetchBlogs();
        }}
      />
    </AdminLayout>
  );
}

