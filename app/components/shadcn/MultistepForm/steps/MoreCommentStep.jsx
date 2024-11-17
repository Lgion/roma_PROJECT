import React from 'react';
import { Label } from "../../ui/label";

export function MoreCommentStep({ formData, updateFormData }) {
  return (
    <div>
      <Label htmlFor="comment">Commentaire</Label>
      <textarea
        id="comment"
        value={formData.comment}
        onChange={(e) => updateFormData({ comment: e.target.value })}
        placeholder="Entrez un commentaire pour votre commande"
      ></textarea>
    </div>
  );
}