"use client"

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Save, Loader2, X } from 'lucide-react';
import Image from 'next/image';
import { updatePartner } from '@/lib/firebaseService';

interface EditPartnerClientProps {
  partnerId: string;
  onClose?: () => void;
  onSuccess?: () => void;
}

export default function EditPartnerClient({ partnerId, onClose, onSuccess }: EditPartnerClientProps) {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    website: '',
    location: '',
    descriptionEn: '',
    descriptionFr: '',
    keyAreasEn: '',
    keyAreasFr: '',
    order: 0,
    isActive: true
  });

  useEffect(() => {
    const fetchPartner = async () => {
      try {
        const docRef = doc(db, 'partners', partnerId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          
          setFormData({
            name: data.name || '',
            logo: data.logo || '',
            website: data.website || '',
            location: data.location || '',
            descriptionEn: data.description?.en || '',
            descriptionFr: data.description?.fr || '',
            keyAreasEn: data.keyAreas?.en?.join('\n') || '',
            keyAreasFr: data.keyAreas?.fr?.join('\n') || '',
            order: data.order || 0,
            isActive: data.isActive !== undefined ? data.isActive : true
          });
        } else {
          alert('Partner not found');
          onClose?.();
        }
      } catch (error) {
        console.error('Error fetching partner:', error);
        alert('Failed to load partner data');
      } finally {
        setFetching(false);
      }
    };

    fetchPartner();
  }, [partnerId, onClose]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const partnerData = {
        name: formData.name,
        logo: formData.logo,
        website: formData.website,
        location: formData.location,
        description: {
          en: formData.descriptionEn,
          fr: formData.descriptionFr
        },
        keyAreas: {
          en: formData.keyAreasEn.split('\n').filter(area => area.trim()),
          fr: formData.keyAreasFr.split('\n').filter(area => area.trim())
        },
        order: formData.order,
        isActive: formData.isActive
      };

      await updatePartner(partnerId, partnerData);
      alert('Partner updated successfully!');
      onSuccess?.();
      onClose?.();
    } catch (error) {
      console.error('Error updating partner:', error);
      alert('Failed to update partner. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-gray-800">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Edit Partner</CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              Update the partner details below.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Basic Information</h3>
                
                <div>
                  <Label htmlFor="name">Partner Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                    placeholder="e.g., AfCFTA Secretariat"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleChange('location', e.target.value)}
                      required
                      placeholder="e.g., Accra, Ghana"
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website *</Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleChange('website', e.target.value)}
                      required
                      placeholder="https://example.com"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="logo">Logo URL *</Label>
                  <Input
                    id="logo"
                    type="url"
                    value={formData.logo}
                    onChange={(e) => handleChange('logo', e.target.value)}
                    required
                    placeholder="https://example.com/logo.png"
                  />
                  {formData.logo && (
                    <div className="mt-2 relative w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={formData.logo}
                        alt="Logo preview"
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Descriptions */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Descriptions</h3>
                
                <div>
                  <Label htmlFor="descriptionEn">Description (English) *</Label>
                  <Textarea
                    id="descriptionEn"
                    value={formData.descriptionEn}
                    onChange={(e) => handleChange('descriptionEn', e.target.value)}
                    required
                    rows={6}
                    placeholder="Enter partner description in English..."
                  />
                </div>

                <div>
                  <Label htmlFor="descriptionFr">Description (French) *</Label>
                  <Textarea
                    id="descriptionFr"
                    value={formData.descriptionFr}
                    onChange={(e) => handleChange('descriptionFr', e.target.value)}
                    required
                    rows={6}
                    placeholder="Enter partner description in French..."
                  />
                </div>
              </div>

              {/* Key Areas */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Key Areas</h3>
                <p className="text-xs text-gray-500">
                  Enter one key area per line
                </p>
                
                <div>
                  <Label htmlFor="keyAreasEn">Key Areas (English) *</Label>
                  <Textarea
                    id="keyAreasEn"
                    value={formData.keyAreasEn}
                    onChange={(e) => handleChange('keyAreasEn', e.target.value)}
                    required
                    rows={5}
                    placeholder="Free Trade Area Coordination&#10;Policy Development&#10;Trade Negotiations"
                  />
                </div>

                <div>
                  <Label htmlFor="keyAreasFr">Key Areas (French) *</Label>
                  <Textarea
                    id="keyAreasFr"
                    value={formData.keyAreasFr}
                    onChange={(e) => handleChange('keyAreasFr', e.target.value)}
                    required
                    rows={5}
                    placeholder="Coordination de la Zone de Libre-Échange&#10;Développement des Politiques&#10;Négociations Commerciales"
                  />
                </div>
              </div>

              {/* Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Settings</h3>
                
                <div>
                  <Label htmlFor="order">Display Order</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) => handleChange('order', parseInt(e.target.value) || 0)}
                    min="0"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Lower numbers appear first (0, 1, 2, etc.)
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => handleChange('isActive', checked)}
                  />
                  <Label htmlFor="isActive" className="cursor-pointer">
                    Active (visible on website)
                  </Label>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-6 border-t">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1 w-full"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#E19D2B] hover:bg-[#D18A1A]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Update Partner
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

